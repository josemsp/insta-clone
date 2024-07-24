import { auth, db, storage } from "@/lib";
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
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export interface UserData {
  docId: string;
  userId: string;
  username: string;
  fullName: string;
  emailAddress: string;
  following: string[];
  followers: string[];
  dateCreated: number;
  bio: string;
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
        username: user?.username || 'Unknown',
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
      displayName,
      comment,
      dateCreated: Timestamp.now(),
      // dateCreatedServer: serverTimestamp()
    })
  });
}

export const getUserProfileByUsername = async ({ loggedUserId, username }: { loggedUserId: string, username: string }) => {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('username', '==', username), limit(1));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) return null;

  const userDoc = querySnapshot.docs[0].data() as UserData;
  const userId = userDoc.userId;

  const photosRef = collection(db, 'photos');
  const photosQuery = query(photosRef, where('userId', '==', userId), orderBy('dateCreated', 'desc'));

  const userQuery = query(
    usersRef,
    where('userId', '==', loggedUserId),
    where('following', 'array-contains', userId)
  )

  const [photoQuerySnapshot, followingSnapshot] = await Promise.all([
    getDocs(photosQuery),
    getDocs(userQuery),
  ]);

  const postsNum = photoQuerySnapshot.docs.length;
  const isFollowing = !followingSnapshot.empty;
  const posts = photoQuerySnapshot.docs.map(doc => ({
    ...doc.data(),
    docId: doc.id
  })) as Photo[];

  return { ...userDoc, posts, postsNum, isFollowing } as UserProfileData;
}

export const uploadImage = async ({ bucket, file, userId }: { bucket: string, file: File, userId: string }) => {
  const metadata = {
    contentType: 'image/jpeg'
  };
  const storageRef = ref(storage, `${bucket}/${userId}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file, metadata);

  // Listen for state changes, errors, and completion of the upload.
  uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    () => {
      // Upload completed successfully, now we can get the download URL
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
      });
    }
  );
}

