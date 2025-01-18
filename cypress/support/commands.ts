/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      testCleanDb(): Chainable<void>;
    }
  }
}

export {};
