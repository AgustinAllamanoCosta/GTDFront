import { defineConfig } from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  video: true,
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    watchForFileChanges: true,
    specPattern: '**/*.cy.tsx',
  },
  env: {
    ...process.env,
    isMobile: false,
  },
  numTestsKeptInMemory: 0,
  experimentalMemoryManagement: true,
  e2e: {
    trashAssetsBeforeRuns: true,
    screenshotOnRunFailure: true,
    baseUrl: 'http://localhost:8080/',
  },
});
