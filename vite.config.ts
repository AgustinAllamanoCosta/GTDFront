import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
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
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        cleanupOutdatedCaches: true,
        sourcemap: true,
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
