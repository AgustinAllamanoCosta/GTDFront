describe('Get The Things Done Task', () => {
  beforeEach(() => {
    cy.testCleanDb();
    window.localStorage.clear();
    if (Cypress.env('isMobile')) {
      cy.viewport(400, 790);
      cy.log('Mobile view');
    } else {
      cy.viewport(1700, 1000);
      cy.log('Desktop view');
    }
  });

  after(() => {
    cy.testCleanDb();
    window.localStorage.clear();
  });

  it('Should not add an empty task', () => {
    cy.visit('/task');
    cy.wait(1000);

    cy.get('[data-cy="task-add-button-input"]').click();
    cy.get('[data-cy="button-accept"]').click();

    cy.get('[data-cy="button-accept"]').should('not.exist');
    cy.get('[data-cy="task-"]').should('not.exist');
  });

  it('Should add a new task and add with accept button', () => {
    const taskContent: string = 'some task to do';
    cy.visit('/task');
    cy.wait(1000);

    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="button-accept"]').click();

    cy.get('[data-cy="button-accept"]').should('not.exist');
    cy.get('[data-cy="task-some task to do"]').should('have.text', taskContent);
  });

  it('Should add a new task', () => {
    const taskContent: string = 'some task to do';
    cy.visit('/task');
    cy.wait(1000);

    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get('[data-cy="task-some task to do"]').should('have.text', taskContent);
  });

  it('Should add a new task and active', () => {
    const taskContent: string = 'some task to do';
    cy.visit('/task');
    cy.wait(1000);

    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');
    cy.get('[data-cy="task-some task to do"]').click();
    cy.get('[data-cy="button-active"]').click();

    cy.get('[data-cy="stick-note-button-0"]').should('be.visible');
    cy.get('[data-cy="stick-note-text-0"]').should(
      'have.text',
      taskContent.toUpperCase(),
    );
  });

  it('Should add a new task, active it and mark as complete', () => {
    const taskContent: string = 'some task to do';
    cy.visit('/task');
    cy.wait(1000);

    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');
    cy.get('[data-cy="task-some task to do"]').click();
    cy.get('[data-cy="button-active"]').click();

    cy.get('[data-cy="stick-note-button-0"]').click();
    cy.get('[data-cy="stick-note-text-0"]').should('not.exist');
    cy.get('[data-cy="task-some task to do"]').should('have.text', taskContent);
  });

  it('Should add a new task and them cancel it', () => {
    const taskContentOne: string = 'some task to do 1';
    cy.visit('/task');
    cy.wait(1000);

    cy.get('[data-cy="task-add-button-input"]').type(taskContentOne);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentOne}"]`).click();
    cy.get(`[data-cy="button-cancel"]`).click();

    cy.wait(1000);

    cy.get('[data-cy="task-some task to do 1"]').should(
      'have.text',
      taskContentOne,
    );
  });
});

export {};
