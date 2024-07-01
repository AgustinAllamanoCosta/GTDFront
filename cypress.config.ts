import { defineConfig } from 'cypress';
import { repositoryFactory } from './src/repository/repository';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    watchForFileChanges: true,
    specPattern: '**/*.cy.tsx',
  },
  env: {
    isMobile: false,
  },
  e2e: {
    baseUrl: 'http://localhost:8080/',
    setupNodeEvents(on, config) {
      on('task', {
        async cleanDB() {
          const firebaseApp = initializeApp({
            apiKey: process.env.VITE_API_KEY,
            authDomain: process.env.VITE_AUTH_DOMAIN,
            projectId: process.env.VITE_PROJECT_ID,
            storageBucket: process.env.VITE_STORAGE_BUACKET,
            messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
            appId: process.env.VITE_APP_ID,
            measurementId: process.env.VITE_MEASUREMENT_ID,
          });
          const useFireBase = getFirestore(firebaseApp);
          const { clear } = repositoryFactory(process.env.VITE_APP_ENV)(
            process.env.VITE_ID ? process.env.VITE_ID : '',
            useFireBase,
          );
          await clear();
          return null;
        },
      });
    },
  },
});
