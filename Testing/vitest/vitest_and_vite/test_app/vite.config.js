import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  test: {
    coverage: {
      all: true,
      exclude: [
        'node_modules/**',
        'src/utilities/**',
        'dist/**',
        'public/**',
    ],
      reporter: ['text', 'json', 'html'],
    },
  },
})
