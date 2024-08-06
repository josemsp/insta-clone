import { Photo, PhotoWithUserDetails, UserData } from "@/services/firebase";
import { Timestamp } from "firebase/firestore";

export const userPassword = 'password123';
export const userWrongPassword = 'wrongpassword';

export const userDataMock: UserData = {
  docId: 'mock-doc-id',
  userId: 'mock-user-id',
  username: 'mock-username',
  fullName: 'mock-full-name',
  emailAddress: 'mock-email@example.com',
  following: [],
  followers: [],
  dateCreated: new Date(),
  bio: 'mock-bio',
  photoUrl: 'mock-photo-url',
  profilePicName: 'mock-profile-pic-name',
};

export const userDataMock2 = {
  docId: 'mock-doc-id-2',
  userId: 'mock-user-id-2',
  username: 'mock-username-2',
  fullName: 'mock-full-name-2',
  emailAddress: 'mock-email@example.com-2',
  following: [],
  followers: [],
  dateCreated: new Date(),
  bio: 'mock-bio-2',
  photoUrl: 'mock-photo-url-2',
  profilePicName: 'mock-profile-pic-name-2',
};

export const userDataMockWrong = {
  docId: 'mock-doc-id',
  userId: 'mock-user-id',
  username: 'mock-username',
  fullName: 'mock-full-name',
  emailAddress: 'mock-email@example.com',
  following: [],
  followers: [],
  dateCreated: new Date(),
  bio: 'mock-bio',
  photoUrl: 'mock-photo-url',
  profilePicName: 'mock-profile-pic-name',
};

export const mockPhotos: Photo[] = [
  {
    photoId: 'mock-photo-id',
    userLongitude: '1',
    likes: [],
    imageSrc: 'https://images.unsplash.com/photo-1678489860799-7d9b6ba0f15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    comments: [],
    userId: userDataMock.userId,
    userLatitude: '1',
    dateCreated: Timestamp.now(),
    caption: 'mock-caption',
    docId: 'mock-doc-id',
  },
  {
    photoId: 'mock-photo-id-2',
    userLongitude: '2',
    likes: [],
    imageSrc: 'https://images.unsplash.com/photo-1678489860799-7d9b6ba0f15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    comments: [],
    userId: userDataMock2.userId,
    userLatitude: '2',
    dateCreated: Timestamp.now(),
    caption: 'mock-caption-2',
    docId: 'mock-doc-id-2',
  }
];

export const mockPhotosWithUserDetails: PhotoWithUserDetails[] = [
  {
    photoId: 'mock-photo-id',
    userLongitude: '1',
    likes: [],
    imageSrc: 'https://images.unsplash.com/photo-1678489860799-7d9b6ba0f15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    comments: [{
      comment: 'mock-comment',
      displayName: userDataMock.username,
      dateCreated: new Date(),
      id: 'comment-id'
    },
    {
      comment: 'mock-comment-2',
      displayName: userDataMock2.username,
      dateCreated: new Date(),
      id: 'comment-id-2'
    }],
    userId: userDataMock.userId,
    userLatitude: '1',
    dateCreated: new Date(),
    caption: 'mock-caption',
    docId: 'mock-doc-id',
    username: userDataMock.username,
    userLikedPhoto: true,
    userPhotoUrl: '',
  },
  {
    photoId: 'mock-photo-id-2',
    userLongitude: '2',
    likes: [],
    imageSrc: 'https://images.unsplash.com/photo-1678489860799-7d9b6ba0f15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    comments: [],
    userId: userDataMock2.userId,
    userLatitude: '2',
    dateCreated: new Date(),
    caption: 'mock-caption-2',
    docId: 'mock-doc-id-2',
    username: userDataMock2.username,
    userLikedPhoto: true,
    userPhotoUrl: '',
  }
];
