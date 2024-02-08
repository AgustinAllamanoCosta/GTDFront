import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    port: 8080,
  },
  server: {
    host: true,
    port: 8080,
  },
  build: {
    rollupOptions: {
      output: {
        sourcemap: false,
        manualChunks: {
          router: ['react-router-dom', 'axios'],
          css: ['styled-components'],
          firebae: ['firebase/app', 'firebase/firestore'],
        },
      },
    },
  },
});
