import { defineConfig } from 'cypress';
import { repository } from './src/repository/repository';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import dotenv from 'dotenv';

dotenv.config({ path: `./env/.env` });

export default defineConfig({
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    watchForFileChanges: true,
    specPattern: '**/*.cy.tsx',
  },
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        async cleanDB() {
          const firebaseApp = initializeApp({
            apiKey: process.env.API_KEY,
            authDomain: process.env.AUTH_DOMAIN,
            projectId: process.env.PROJECT_ID,
            storageBucket: process.env.STORAGE_BUACKET,
            messagingSenderId: process.env.MESSAGING_SENDER_ID,
            appId: process.env.APP_ID,
            measurementId: process.env.MEASUREMENT_ID,
          });
          const useFireBase = getFirestore(firebaseApp);
          const { clear } = repository(
            process.env.ID ? process.env.ID : '',
            useFireBase,
          );
          await clear();
          return null;
        },
      });
    },
  },
});
