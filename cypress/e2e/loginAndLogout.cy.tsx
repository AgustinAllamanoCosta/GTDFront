import { configViewPorts, USER_NAME } from './testSupports.cy';

describe('Get The Things Done Login and Logout', () => {
  beforeEach(() => {
    configViewPorts();
  });

  it('Should Login into the app with a gmail account', () => {
    cy.visit('/');
    cy.get('[data-cy="Card-SubTitle"]').should(
      'have.text',
      `Hi ${USER_NAME} !`,
    );
  });

  it('Should logout', () => {
    cy.visit('/');
    cy.get('[data-cy="button-text"]').click();
    cy.get('[data-cy="Card-SubTitle"]').should('not.exist');

    cy.get('[data-cy="input-email"]').should('exist');
    cy.get('[data-cy="input-pass"]').should('exist');
    cy.get('[data-cy="button-Login"]').should('exist');
  });

  it('Should show the error view', () => {
    cy.visit('/');
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

  it('Should not load the task from the previous user', () => {
    const taskContent: string = 'some task to do';

    cy.visit('/task');
    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');
    cy.get('[data-cy="button-text"]').click();
    cy.get('[data-cy="input-email"]').type('gtdtest@gmail.com');
    cy.get('[data-cy="input-pass"]').type('12345678');
    cy.get('[data-cy="button-Login"]').click();

    cy.get(`[data-cy="task-${taskContent}"]`).should('not.exist');
  });
});

export {};
