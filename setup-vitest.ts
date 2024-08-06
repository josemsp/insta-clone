import '@testing-library/jest-dom';
import {
  addCommentToPhoto,
  getUserByEmail,
  getUserByUserId,
  getUserByUsername,
  listenToPhotosUpdates,
  signIn,
  signUp,
  updateLikes
} from '__mocks__/firebase';
import React from 'react';
global.React = React;
import '__mocks__/svg-mock';
// import { userDataMock } from '__mocks__/user-data-mock';

vi.mock('zustand'); // to make it works like Jest (auto-mocking)

// Mocking import.meta.env
vi.stubGlobal('import.meta', {
  env: {
    MODE: 'production',
    BASE_URL: 'https://example.com/',
  },
});

// vi.stubGlobal('import.meta', {
//   env: {
//     MODE: 'development',
//     BASE_URL: '',
//   },
// });

vi.mock('@/constants/paths', () => ({
  PROFILE_PATH: (username: string) => `/profile/${username}`,
  IMAGE_PUBLIC_PATH: (filename: string) => {
    const url = import.meta.env.MODE === 'production' ? import.meta.env.BASE_URL : '/';
    return `${url}images/${filename}`;
  }
}));

// vi.mock('@/hooks/use-user-store', () => ({
//   useUserStore: () => ({
//     user: userDataMock,
//     isLoading: false,
//     error: null,
//   }),
// }));

// Mock firebase
vi.mock('@/services/firebase', () => ({
  getUserByEmail,
  getUserByUsername,
  signUp,
  getUserByUserId,
  signIn,
  listenToPhotosUpdates,
  updateLikes,
  addCommentToPhoto,
}));
