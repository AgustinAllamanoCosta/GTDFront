/// <reference types="cypress" />

Cypress.Commands.add('testCleanDb', () => {
  cy.task('cleanDB');
});

declare global {
  namespace Cypress {
    interface Chainable {
      testCleanDb(): Chainable<void>;
    }
  }
}

export {};
