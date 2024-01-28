const USER_NAME: string = 'Test User';

describe('Get The Things Done', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  beforeEach(() => {
    cy.log('Logging in to Google');
    cy.viewport(790, 790);
  });

  it('Should Login into the app with a gmail account', () => {
    cy.visit(Cypress.env('BASE_URL'));
    cy.get('[data-cy="Card-SubTitle"]').should(
      'have.text',
      `Hi ${USER_NAME} !`,
    );
  });

  it('Should logout', () => {
    cy.visit(Cypress.env('BASE_URL'));
    cy.get('[data-cy="button-text"]').click();
    cy.get('[data-cy="Card-SubTitle"]').should('not.exist');
    cy.get('[data-cy="button-gtd"]').should('exist');
  });

  it('Should show the error view', () => {
    cy.visit(Cypress.env('BASE_URL'));
    cy.get('[data-cy="button-text"]').click();
    cy.visit(`${Cypress.env('BASE_URL')}task123132`);
    cy.get('[data-cy="Error-view-message"]').should(
      'have.text',
      'Ups looks like this page does not exist :(',
    );
    cy.get('[data-cy="button-text"]').click();
    cy.get('[data-cy="Card-SubTitle"]').should(
      'have.text',
      `Hi ${USER_NAME} !`,
    );
  });
});

export {};
