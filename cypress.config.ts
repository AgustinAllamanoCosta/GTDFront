import { defineConfig } from 'cypress';

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
    ID: 'TEST-ID-123123123123123123',
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
