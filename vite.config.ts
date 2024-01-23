import { defineConfig } from 'vite';
import EnvironmentPlugin from 'vite-plugin-environment';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin('all')],
  envDir: './env',
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
          router: ['react-router-dom'],
        },
      },
    },
  },
});
