import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
import path from 'path'

export default mergeConfig(
  defineConfig({
    ...viteConfig,
  }),
  defineConfig({
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./setup-vitest.ts'],
      alias: {
        '@': path.resolve(__dirname, './src'),
        "__mocks__": path.resolve(__dirname, "./__mocks__"),
      },
    },
  }),
)