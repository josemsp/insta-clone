import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      return config;
    },
    baseUrl: 'http://localhost:5173/#/',
    supportFile: 'cypress/support/e2e.ts',
    env: {
      VITE_APP_FIREBASE_API_KEY: import.meta.env.VITE_APP_FIREBASE_API_KEY,
      VITE_APP_FIREBASE_API_AUTH_DOMAIN: import.meta.env.VITE_APP_FIREBASE_API_AUTH_DOMAIN,
      VITE_APP_FIREBASE_API_PROJECT_ID: import.meta.env.VITE_APP_FIREBASE_API_PROJECT_ID,
      VITE_APP_FIREBASE_API_STORAGE_BUCKET: import.meta.env.VITE_APP_FIREBASE_API_STORAGE_BUCKET,
      VITE_APP_FIREBASE_API_MESSAGING: import.meta.env.VITE_APP_FIREBASE_API_MESSAGING,
      VITE_APP_FIREBASE_API_APP_ID: import.meta.env.VITE_APP_FIREBASE_API_APP_ID
    },
  },
});
