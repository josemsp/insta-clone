import { auth, db, storage } from "@/lib/firebase";
import {
  AuthError,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  UserCredential
} from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where
} from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid'

export interface UserData {
  docId: string;
  userId: string;
  username: string;
  fullName: string;
  emailAddress: string;
  following: string[];
  followers: string[];
  dateCreated: Timestamp;
  bio: string;
  photoUrl: string;
}

export interface UserProfileData extends UserData {
  postsNum: number;
  isFollowing: boolean;
  posts: Photo[];
}

interface CommentDB {
  comment: string;
  displayName: string;
  dateCreated: Timestamp;
}

interface Comment {
  comment: string;
  displayName: string;
  dateCreated: Date;
}

interface Photo {
  photoId: number;
  userLongitude: string;
  likes: string[];
  imageSrc: string;
  comments: CommentDB[];
  userId: string;
  userLatitude: string;
  dateCreated: Timestamp;
  caption: string;
  docId: string;
}

export interface PhotoWithUserDetails {
  photoId: number;
  userLongitude: string;
  likes: string[];
  imageSrc: string;
  userId: string;
  userLatitude: string;
  caption: string;
  docId: string;
  username: string;
  userLikedPhoto: boolean;
  dateCreated: Date;
  comments: Comment[];
  userPhotoUrl: string;
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
      photoUrl: userCredential.user.photoURL || ''
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

export const getUserByEmail = async ({ email }: { email: string }) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('emailAddress', '==', email), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    return { userId: userDoc.id, ...userDoc.data() } as UserData;
  }

  return null;
}

export const getUserByUsername = async ({ username }: { username: string }) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username), limit(1));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    return { userId: userDoc.id, ...userDoc.data() } as UserData;
  }

  return null;
}

export const getUserByUserId = async ({ userId }: { userId: string }) => {
  // const userDoc = await getDoc(doc(db, 'users', userId));

  // if (userDoc.exists()) {
  //   return { userId, ...userDoc.data() } as UserData;
  // }

  // const usersRef = collection(db, 'users');
  // const q = query(usersRef, where('userId', '==', userId), limit(1));
  // const querySnapshot = await getDocs(q);

  // if (!querySnapshot.empty) {
  //   const userDoc = querySnapshot.docs[0];
  //   return { userId: userDoc.id, ...userDoc.data() } as UserData;
  // }

  // return null;

  const userDoc = await getDoc(doc(db, 'users', userId));
  if (userDoc.exists()) {
    // return { userId, ...userDoc.data() } as UserData;
    return userDoc.data() as UserData;
  } else {
    // Si el documento no existe, crea uno nuevo con datos básicos
    const newUserData: UserData = {
      docId: userId,
      userId,
      emailAddress: auth.currentUser?.email || '',
      fullName: auth.currentUser?.displayName || '',
      username: auth.currentUser?.email || '',
      bio: '',
      dateCreated: Timestamp.now(),
      following: [],
      followers: [],
      photoUrl: auth.currentUser?.photoURL || ''
    };
    await setDoc(doc(db, 'users', userId), newUserData);
    return newUserData;
  }
}

export const updateUserData = async ({ userId, data }: { userId: string, data: Partial<UserData> }) => {
  await updateDoc(doc(db, 'users', userId), data);
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

export const listenToPhotosUpdates = ({ userId, following, callback }: { userId: string, following: string[], callback: (v: PhotoWithUserDetails[]) => void }) => {
  const q = query(collection(db, 'photos'), where("userId", "in", following));
  const unsubscribe = onSnapshot(q, async (snapshot) => {
    const photosOfUsersFollowing = snapshot.docs.map(photo => ({
      ...photo.data(),
      docId: photo.id,
    })) as Photo[];

    const userIds = [...new Set(photosOfUsersFollowing.map(photo => photo.userId))];
    const usersPromises = userIds.map(id => getUserByUserId({ userId: id }));
    const users = await Promise.all(usersPromises);
    const userMap = new Map(users.map(user => [user?.userId, user]));

    const photosWithUserDetails: PhotoWithUserDetails[] = photosOfUsersFollowing.map(photo => {
      const user = userMap.get(photo.userId);
      return {
        ...photo,
        userPhotoUrl: user?.photoUrl || '',
        username: user?.username || '',
        userLikedPhoto: photo.likes.includes(userId),
        dateCreated: photo.dateCreated.toDate(),
        comments: photo.comments
          .map(c => ({ ...c, dateCreated: c.dateCreated.toDate() }))
          .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
      };
    });

    callback(photosWithUserDetails)
  })

  return unsubscribe;
}

export const updateLikes = async ({ photoId, toggleLiked, userId }: { photoId: string, toggleLiked: boolean, userId: string }) => {
  const photoDocRef = doc(db, "photos", photoId);
  await updateDoc(photoDocRef, {
    likes: toggleLiked ? arrayUnion(userId) : arrayRemove(userId)
  });
}

export const addCommentToPhoto = async ({ photoId, comment, displayName }: { photoId: string, comment: string, displayName: string }) => {
  const photoDocRef = doc(db, "photos", photoId);
  await updateDoc(photoDocRef, {
    comments: arrayUnion({
      id: uuidv4(),
      displayName,
      comment,
      dateCreated: Timestamp.now()
    })
  });
}

export const uploadImage = async ({ file, userId, bucket = 'posts' }: { file: File, userId: string, bucket: string }) => {
  const fileExtension = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  const filePath = `${bucket}/${userId}/${fileName}`;

  const storageRef = ref(storage, filePath);

  try {
    const uploadTask = uploadBytesResumable(storageRef, file);

    await new Promise<void>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => reject(error),
        () => resolve()
      );
    });

    const downloadURL = await getDownloadURL(storageRef);

    return { url: downloadURL, path: filePath };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const deleteImageProfile = async ({ userId, bucket = 'posts', fileName }: { userId: string, bucket: string, fileName: string }) => {
  const filePath = `${bucket}/${userId}/${fileName}`;
  const storageRef = ref(storage, filePath);
  await deleteObject(storageRef);
}

export const changeImageProfile = async ({ file, userId, oldPhotoUrl }: { file: File, userId: string, oldPhotoUrl: string }) => {
  const { url } = await uploadImage({ file, userId, bucket: 'avatars' });
  await Promise.allSettled([
    deleteImageProfile({ userId, bucket: 'avatars', fileName: oldPhotoUrl }),
    updateUserData({ userId, data: { photoUrl: url } }),
  ])
}

export const createPost = async ({ imageUrl, caption, userId }: { imageUrl: string, caption: string, userId: string }) => {
  const postDocRef = doc(db, "photos", uuidv4());
  await setDoc(postDocRef, {
    imageSrc: imageUrl,
    caption,
    dateCreated: Timestamp.now(),
    dateCreatedServer: serverTimestamp(),
    userId,
    userLatitude: 'userLatitude',
    likes: [],
    comments: [],
  });
}

export const getProfileData = async (userId: string, loggedUserId: string) => {
  const photosRef = collection(db, 'photos');
  const photosQuery = query(
    photosRef,
    where('userId', '==', userId),
    orderBy('dateCreated', 'desc')
  );

  const usersRef = collection(db, 'users');
  const followingQuery = query(
    usersRef,
    where('userId', '==', loggedUserId),
    where('following', 'array-contains', userId)
  );

  const [photoQuerySnapshot, followingSnapshot] = await Promise.all([
    getDocs(photosQuery),
    getDocs(followingQuery),
  ]);

  const posts = photoQuerySnapshot.docs.map(doc => ({
    ...doc.data(),
    docId: doc.id
  })) as Photo[];

  return {
    posts,
    postsNum: posts.length,
    isFollowing: !followingSnapshot.empty
  };
}

export const listenToUserByUsername = ({ username, callback, callbackError }: { username: string, callback: (v: QuerySnapshot) => void, callbackError: (err: Error) => void }) => {
  const usersRef = collection(db, 'users');
  const userQuery = query(usersRef, where('username', '==', username));

  const unsubscribe = onSnapshot(userQuery, async (snapshot) => {
    callback(snapshot);
  },
    (err) => {
      callbackError(err);
    })

  return unsubscribe;
}

export const listenToProfile = ({ loggedUserId, userId, callback }: { loggedUserId: string, userId: string, callback: (v: UserProfileData) => void }) => {
  // const usersRef = collection(db, 'users');
  // const userQuery = query(usersRef, where('username', '==', username), limit(1));
  // const querySnapshot = await getDocs(userQuery);

  // if (querySnapshot.empty) return null;

  // const userDoc = querySnapshot.docs[0].data() as UserData;
  // const userId = userDoc.userId;

  const photosRef = collection(db, 'photos');
  // const q = query(photosRef, where("username", "==", username));
  const photosQuery = query(photosRef, where('userId', '==', userId), orderBy('dateCreated', 'desc'));

  const unsubscribe = onSnapshot(photosQuery, async (snapshot) => {
    if (snapshot.empty) return;

    // const photosQuery = query(photosRef, where('userId', '==', userId), orderBy('dateCreated', 'desc'));
    const usersRef = collection(db, 'users');

    const userDoc = await getUserByUserId({ userId: loggedUserId });

    const userFollowingQuery = query(
      usersRef,
      where('userId', '==', loggedUserId),
      where('following', 'array-contains', userId)
    )

    const [photoQuerySnapshot, followingSnapshot] = await Promise.all([
      getDocs(photosQuery),
      getDocs(userFollowingQuery),
    ]);

    const postsNum = photoQuerySnapshot.docs.length;
    const isFollowing = !followingSnapshot.empty;
    const posts = photoQuerySnapshot.docs.map(doc => ({
      ...doc.data(),
      docId: doc.id
    })) as Photo[];

    const profileData = { ...userDoc, posts, postsNum, isFollowing } as UserProfileData;
    callback(profileData)
  })

  return unsubscribe;
}
