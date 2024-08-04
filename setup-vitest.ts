import '@testing-library/jest-dom';
import {
  getUserByEmail,
  getUserByUserId,
  getUserByUsername,
  listenToPhotosUpdates,
  signIn,
  signUp
} from '__mocks__/firebase';

vi.mock('zustand'); // to make it works like Jest (auto-mocking)

import React from 'react';
global.React = React;

// Mock firebase
vi.mock('@/services/firebase', () => ({
  getUserByEmail,
  getUserByUsername,
  signUp,
  getUserByUserId,
  signIn,
  listenToPhotosUpdates,
}));
