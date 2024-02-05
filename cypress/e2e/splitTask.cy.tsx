describe('Get The Things Done', () => {
  beforeEach(() => {
    cy.testCleanDb();
    window.localStorage.clear();
    if (Cypress.env('isMobile')) {
      cy.viewport(790, 790);
      cy.log('Mobile view');
    } else {
      cy.viewport(1000, 1000);
      cy.log('Desktop view');
    }
  });

  afterEach(() => {
    cy.testCleanDb();
    window.localStorage.clear();
  });

  it('Should split an existing task', () => {
    const taskContent: string = 'task to split';
    const subTaskContentOne: string = 'sub task to split one';
    const subTaskContentTwo: string = 'sub task to split two';

    cy.visit(Cypress.env('BASE_URL'));
    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');
    cy.get(`[data-cy="task-${taskContent}"]`).trigger('mouseover');

    cy.get(`[data-cy="button-split"]`).click();

    cy.get('[data-cy="task-add-button-task1"]').type(subTaskContentOne);
    cy.get('[data-cy="task-add-button-task2"]').type(subTaskContentTwo);

    cy.get(`[data-cy="button-split"]`).click();

    cy.get(`[data-cy="task-${taskContent}"]`).should('not.exist');
    cy.get(`[data-cy="task-${subTaskContentOne}"]`).should(
      'have.text',
      subTaskContentOne,
    );
    cy.get(`[data-cy="task-${subTaskContentTwo}"]`).should(
      'have.text',
      subTaskContentTwo,
    );
  });

  it('Should not split an existing task', () => {
    const taskContent: string = 'task to split';
    const subTaskContentOne: string = 'sub task to split one';

    cy.visit(Cypress.env('BASE_URL'));
    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');
    cy.get(`[data-cy="task-${taskContent}"]`).trigger('mouseover');

    cy.get(`[data-cy="button-split"]`).click();

    cy.get('[data-cy="task-add-button-task1"]').type(subTaskContentOne);

    cy.get(`[data-cy="button-cancel"]`).click();

    cy.get(`[data-cy="task-${taskContent}"]`).should('have.text', taskContent);
    cy.get(`[data-cy="task-${subTaskContentOne}"]`).should('not.exist');
  });

  it('Should not split an existing task with only one input complete', () => {
    const taskContent: string = 'task to split';
    const subTaskContentOne: string = 'sub task to split one';

    cy.visit(Cypress.env('BASE_URL'));
    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');
    cy.get(`[data-cy="task-${taskContent}"]`).trigger('mouseover');

    cy.get(`[data-cy="button-split"]`).click();

    cy.get('[data-cy="task-add-button-task1"]').type(subTaskContentOne);

    cy.get(`[data-cy="button-split"]`).click();

    cy.get(`[data-cy="task-${taskContent}"]`).should('have.text', taskContent);
    cy.get(`[data-cy="task-${subTaskContentOne}"]`).should('not.exist');
  });
});

export {};
