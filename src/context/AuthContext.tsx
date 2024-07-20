import { auth } from "@/lib";
import { getUserByUserId, UserData } from "@/services";
// import { FirebaseApp } from "firebase/app";
// import { addUserDocument, logOut, signIn, signUp } from "@/services";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useEffect, useMemo, useState } from "react";

export interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  // firebase: FirebaseApp
  // signUp: typeof signUp;
  // signIn: typeof signIn;
  // logOut: typeof logOut;
  // addUserDocument: typeof addUserDocument;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('userAuth')
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // const unsubscribe = onAuthStateChanged(auth, setUser);
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      if (user) {
        const userDataDB = await getUserByUserId({ userId: user.uid })
        setUserData(userDataDB)
        localStorage.setItem('authUser', JSON.stringify(userDataDB))
      } else {
        localStorage.removeItem('authUser')
        setUserData(null)
      }
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(() => ({
    user,
    userData,
    // firebase
    // signUp: signUp,
    // signIn: signIn,
    // logOut: logOut,
    // addUserDocument: addUserDocument,
  }), [user, userData]);

  // const value = {
  //   user,
  //   userData,
  //   // firebase
  //   // signUp: signUp,
  //   // signIn: signIn,
  //   // logOut: logOut,
  //   // addUserDocument: addUserDocument,
  // }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
