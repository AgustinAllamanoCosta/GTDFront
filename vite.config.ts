/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./setup.ts'],
    include: ['./src/**/*.spec.edge.tsx'],
    globals: true,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'script',
      includeAssets: ['apple-icon-180.png'],
      manifest: {
        icons: [
          {
            src: './src/assets/apple-icon-180.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: './src/assets/manifest-icon-192.maskable.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: './src/assets/manifest-icon-512.maskable.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        name: 'Getting Things Done',
        short_name: 'GTD',
        description: 'Your friendly task manager',
        display: 'fullscreen',
        scope: '/',
        start_url: '/',
        orientation: 'portrait',
        theme_color: '#070F2B',
        background_color: '#070F2B',
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
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
