import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      config.env = {
        ...config.env,
        ...process.env,
      }
      return config 
    },
    baseUrl: 'http://localhost:5173/#/',
    supportFile: 'cypress/support/e2e.ts',
    env: {
      ...process.env,
    },
  },
  env: {
    ...process.env,
  },
});
