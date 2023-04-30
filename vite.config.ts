// triple-slash directive isn't a comment, it's a directive to the compiler to include declarations from the specified file.
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
    test: {
      globals: true,
      // this just tells vite to use jsdom instead of react for tests
      environment: 'jsdom',
    }
})