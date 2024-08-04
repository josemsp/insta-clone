import { type StateCreator } from "zustand"
import {
  changeImageProfile,
  getUserByEmail,
  getUserByUserId,
  getUserByUsername,
  logOut,
  NewUser,
  signIn,
  signUp,
  updateFollowingUsersByUserId,
  updateUserData,
  UserData
} from "@/services/firebase";

export interface UserStore {
  user: UserData | null;
  loading: boolean;
  error: string | null;
  signUp: (userData: NewUser) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserData: (data: Partial<UserData>) => Promise<void>;
  updateUserPhotoProfile: (file: File) => Promise<void>;
  followUser: (userId: string) => Promise<void>;
  unfollowUser: (userId: string) => Promise<void>;
}

export const userStoreCreator: StateCreator<UserStore> = (set, get): UserStore => ({
  user: null,
  loading: false,
  error: null,
  signUp: async (userData: NewUser) => {
    const { username, fullName, email, password } = userData;

    if (!username || !fullName || !email || !password) {
      set({ error: 'All fields are required.', loading: false });
      return;
    }
    
    set({ loading: true, error: null });
    try {

      const [userEmail, userUsername] = await Promise.all([
        getUserByEmail({ email }),
        getUserByUsername({ username }),
      ])

      if (userEmail) {
        throw new Error('That email is already taken, please try another.');
      }

      if (userUsername) {
        throw new Error('That username is already taken, please try another.');
      }

      const userCredential = await signUp({ username, fullName, email, password });
      const userData = await getUserByUserId({ userId: userCredential.user.uid });
      set({ user: userData, loading: false });
    } catch (error) {
      console.error('userStoreCreator signUp error', error)
      set({ error: (error as Error).message, loading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const userCredential = await signIn(email, password);
      const userData = await getUserByUserId({ userId: userCredential.user.uid });
      set({ user: userData, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
      throw error;
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
});