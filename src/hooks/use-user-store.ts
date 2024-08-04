import { auth } from "@/lib/firebase";
import {
  getUserByUserId,
} from "@/services/firebase";
import { UserStore, userStoreCreator } from "@/shared/user-store-creator";
import { onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useUserStore = create<UserStore>()(
  persist(
    userStoreCreator,
    {
      name: 'user-storage',
      storage: createJSONStorage(() => sessionStorage)
    }
  )
);

onAuthStateChanged(auth, async (firebaseUser) => {
  console.log('firebaseUser', firebaseUser)
  if (firebaseUser) {
    const userData = await getUserByUserId({ userId: firebaseUser.uid });
    useUserStore.setState({ user: userData, loading: false, error: null });
  } else {
    useUserStore.setState({ user: null, loading: false, error: null });
  }
});
