import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: mode === 'production' ? '/insta-clone/' : '/',
    plugins: [
      react(),
      svgr()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
        "__mocks__": path.resolve(__dirname, "./__mocks__"),
      }
    },

  }
})
