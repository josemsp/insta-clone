import { auth } from "@/lib/firebase";
import {
  changeImageProfile,
  getUserByUserId,
  logOut,
  signIn,
  updateFollowingUsersByUserId,
  updateUserData,
  UserData
} from "@/services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface UserStore {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  updateUserPhotoProfile: (file: File) => Promise<void>;
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      loading: true,
      error: null,

      login: async (email, password) => {
        set({ loading: true, error: null });
        try {
          const userCredential = await signIn(email, password);
          const userData = await getUserByUserId({ userId: userCredential.user.uid });
          set({ user: userData, loading: false });
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
        }
      },

      logout: async () => {
        set({ loading: true, error: null });
        try {
          await logOut();
          set({ user: null, loading: false });
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
        }
      },

      updateUserData: async (data) => {
        const { user } = get();
        if (!user) return;

        set({ loading: true, error: null });
        try {
          const updatedUser = { ...user, ...data };
          await updateUserData({ userId: user.userId, data: updatedUser });
          set({ user: updatedUser, loading: false });
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
        }
      },

      updateUserPhotoProfile: async (file: File) => {
        const { user } = get();
        if (!user) return;

        set({ loading: true, error: null });
        try {
          await changeImageProfile({ file, userId: user.userId, oldPhotoName: user.profilePicName });
          const updatedUser = await getUserByUserId({ userId: user.userId });
          set({ user: updatedUser, loading: false });
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
        }

      },

      followUser: async (userId: string) => {
        const { user } = get();
        if (!user) return;

        set({ loading: true, error: null });
        try {
          await updateFollowingUsersByUserId({ userId: user.userId, userIdToFollow: userId, follow: true });
          const updatedUser = await getUserByUserId({ userId: user.userId });
          set({ user: updatedUser, loading: false });
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
        }
      },

      unfollowUser: async (userId: string) => {
        const { user } = get();
        if (!user) return;

        set({ loading: true, error: null });
        try {
          await updateFollowingUsersByUserId({ userId: user.userId, userIdToFollow: userId, follow: false });
          const updatedUser = await getUserByUserId({ userId: user.userId });
          set({ user: updatedUser, loading: false });
        } catch (error) {
          set({ error: (error as Error).message, loading: false });
        }
      },

    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

onAuthStateChanged(auth, async (firebaseUser) => {
  if (firebaseUser) {
    const userData = await getUserByUserId({ userId: firebaseUser.uid });
    useUserStore.setState({ user: userData, loading: false });
  } else {
    useUserStore.setState({ user: null, loading: false });
  }
});
