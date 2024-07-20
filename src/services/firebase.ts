import { auth, db } from "@/lib";
import { AuthError, browserLocalPersistence, createUserWithEmailAndPassword, setPersistence, signInWithEmailAndPassword, signOut, updateProfile, UserCredential } from "firebase/auth";
import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, limit, query, serverTimestamp, setDoc, Timestamp, updateDoc, where } from "firebase/firestore";

export interface UserData {
  docId: string;
  userId: string;
  username: string;
  fullName: string;
  emailAddress: string;
  following: string[];
  followers: string[];
  dateCreated: number;
}

export const signUp = async ({ username, fullName, email, password }: { username: string, fullName: string, email: string, password: string }): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await Promise.all([
    updateProfile(userCredential.user, { displayName: username.toLowerCase() }),
    setDoc(doc(db, 'users', userCredential.user.uid), {
      userId: userCredential.user.uid,
      username: username.toLowerCase(),
      fullName,
      emailAddress: email.toLowerCase(),
      following: [],
      dateCreated: Timestamp.now(),
      dateCreatedServer: serverTimestamp()
    })
  ])
  return userCredential;
};

export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    await setPersistence(auth, browserLocalPersistence)
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    const authError = error as AuthError;
    switch (authError.code) {
      case 'auth/user-not-found':
        throw new Error('No user found with this email.');
      case 'auth/wrong-password':
        throw new Error('Incorrect password.');
      case 'auth/invalid-email':
        throw new Error('Invalid email format.');
      case 'auth/user-disabled':
        throw new Error('This account has been disabled.');
      default:
        throw new Error('An error occurred during sign in. Please try again.');
    }
  }
};

export const logOut = (): Promise<void> => {
  return signOut(auth);
};

export const searchUsersByName = async (username: string) => {
  const users: UserData[] = [];
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '>=', username), where('username', '<=', username + '\uf8ff'));

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    users.push({ ...doc.data() } as UserData);
  })
  return users;
}

export const userExists = async ({ email }: { email: string }) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('emailAddress', '==', email), limit(1));
  const querySnapshot = await getDocs(q);

  return !querySnapshot.empty;
}

export const getUserByUserId = async ({ userId }: { userId: string }) => {
  const userDoc = await getDoc(doc(db, 'users', userId));

  if (userDoc.exists()) {
    return { userId, ...userDoc.data() } as UserData;
  }

  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('userId', '==', userId), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    return { userId: userDoc.id, ...userDoc.data() } as UserData;
  }

  return null;
}

export const getSuggestedProfiles = async ({ userId, following }: { userId: string, following: string[] }) => {
  try {
    const usersRef = collection(db, 'users');

    let filter
    if (following.length) {
      filter = where('userId', 'not-in', [...following, userId]);
    } else {
      filter = where('userId', '!=', userId)
    }

    const querySnapshot = await getDocs(query(usersRef, filter, limit(10)));

    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      docId: doc.id
    })) as UserData[];
  } catch (error) {
    console.log('error', error)
    throw error
  }
}

export const updateFollowingUsersByUserId = async ({ userId, userIdToFollow, follow }: { userId: string, userIdToFollow: string, follow: boolean }) => {
  const userDocRef = doc(db, "users", userId);
  await updateDoc(userDocRef, {
    following: follow ? arrayUnion(userIdToFollow) : arrayRemove(userIdToFollow)
  });
}
