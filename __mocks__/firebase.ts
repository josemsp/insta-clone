import { NewUser, Photo, PhotoWithUserDetails } from '@/services/firebase';
import { userDataMock, userDataMock2, userDataMockWrong, userPassword, userWrongPassword } from './user-data-mock';
import { Timestamp } from 'firebase/firestore';

interface UserMocked {
  user: { uid: string };
}

export const getUserByEmail = async ({ email }: { email: string }) => { // 
  console.log('Mock getUserByEmail called', { email });
  if (email === userDataMockWrong.emailAddress) {
    return null;
  }
  return userDataMock;
}
export const getUserByUsername = async ({ username }: { username: string }) => {
  console.log('Mock getUserByEmail called', { username });
  if (username === userDataMockWrong.username) {
    return null;
  }
  return userDataMock;
}
// signUp: async ({ username, fullName, email, password }: NewUser): Promise<UserMocked> => {
//   console.log('Mock signUp called', { username, fullName, email, password });
//   return { user: { uid: 'mock-uid' } };
// },
export const signUp = async ({ username, fullName, email, password }: NewUser): Promise<UserMocked> => {
  console.log('Mock signUp called', { username, fullName, email, password });
  return new Promise(resolve => setTimeout(() => resolve({ user: { uid: userDataMock.userId } }), 100));
}

export const getUserByUserId = async ({ userId }: { userId: string }) => {
  console.log('Mock getUserByUserId called', { userId });
  return userDataMock;
}

export const signIn = async (email: string, password: string): Promise<UserMocked | undefined> => {
  console.log('Mock signIn called', { email, password });
  if (email === '' || password === '') {
    throw new Error('All fields are required.');
  }
  if (email === userDataMock.emailAddress && password === userPassword) {
    return new Promise(resolve => setTimeout(() => resolve({ user: { uid: userDataMock.userId } }), 100));
  }
  if (email === userDataMockWrong.emailAddress && password === userWrongPassword) {
    throw new Error('Invalid email or password.');
  }
}

export const listenToPhotosUpdates = ({ userId, following, callback }: { userId: string, following: string[], callback: (v: PhotoWithUserDetails[]) => void }) => {
  console.log('listenToPhotosUpdates start', { userId, following })
  const photosOfUsersFollowing: Photo[] = [
    {
      photoId: 1,
      userLongitude: '1',
      likes: [],
      imageSrc: 'https://images.unsplash.com/photo-1678489860799-7d9b6ba0f15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      comments: [{
        comment: 'mock-comment',
        displayName: userDataMock.username,
        dateCreated: Timestamp.now(),
        id: 'comment-id'
      },
      {
        comment: 'mock-comment-2',
        displayName: userDataMock2.username,
        dateCreated: Timestamp.now(),
        id: 'comment-id-2'
      }],
      userId: userDataMock.userId,
      userLatitude: '1',
      dateCreated: Timestamp.now(),
      caption: 'mock-caption',
      docId: 'mock-doc-id'
    },
    {
      photoId: 2,
      userLongitude: '2',
      likes: [],
      imageSrc: 'https://images.unsplash.com/photo-1678489860799-7d9b6ba0f15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      comments: [],
      userId: userDataMock2.userId,
      userLatitude: '2',
      dateCreated: Timestamp.now(),
      caption: 'mock-caption',
      docId: 'mock-doc-id'
    }
  ]
  const userMap = new Map([userDataMock, userDataMock2].map(user => [user?.userId, user]));

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

  const unsubscribe = () => { }

  return unsubscribe;
}