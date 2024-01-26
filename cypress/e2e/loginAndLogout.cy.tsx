const USER_NAME: string = 'Test User';
const URL: string = 'http://localhost:8080/';

describe('Get The Things Done', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  beforeEach(() => {
    cy.log('Logging in to Google');
    cy.viewport(790, 790);
  });

  it('Should Login into the app with a gmail account', () => {
    cy.visit(URL);
    cy.get('[data-cy="Card-SubTitle"]').should(
      'have.text',
      `Hi ${USER_NAME} !`,
    );
  });

  it('Should logout', () => {
    cy.visit(URL);
    cy.get('[data-cy="button-text"]').click();
    cy.get('[data-cy="Card-SubTitle"]').should('not.exist');
    cy.get('[data-cy="button-gtd"]').should('exist');
  });

  it('Should show the error view', () => {
    cy.visit(URL);
    cy.get('[data-cy="button-text"]').click();
    cy.visit(`${URL}task123132`);
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
