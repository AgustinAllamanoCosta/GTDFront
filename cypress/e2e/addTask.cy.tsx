describe('Get The Things Done Task', () => {
  beforeEach(() => {
    cy.testCleanDb();
    window.localStorage.clear();
    if (Cypress.env('isMobile')) {
      cy.viewport(790, 790);
      cy.log('Mobile view');
    } else {
      cy.viewport(1700, 1000);
      cy.log('Desktop view');
    }
  });

  afterEach(() => {
    cy.testCleanDb();
    window.localStorage.clear();
  });

  it('Should add a new task', () => {
    const taskContent: string = 'some task to do';
    cy.visit(Cypress.env('BASE_URL'));
    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');
    cy.get('[data-cy="task-some task to do"]').should('have.text', taskContent);
  });

  it('Should add a new task and active', () => {
    const taskContent: string = 'some task to do';
    cy.visit(Cypress.env('BASE_URL'));
    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');
    cy.get('[data-cy="task-some task to do"]').trigger('mouseover');
    cy.get('[data-cy="button-active"]').click();

    cy.get('[data-cy="stick-note-button-0"]').should('be.visible');
    cy.get('[data-cy="stick-note-text-0"]').should(
      'have.text',
      taskContent.toUpperCase(),
    );
  });

  it('Should add a new task, active it and mark as complete', () => {
    const taskContent: string = 'some task to do';
    cy.visit(Cypress.env('BASE_URL'));
    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');
    cy.get('[data-cy="task-some task to do"]').trigger('mouseover');
    cy.get('[data-cy="button-active"]').click();

    cy.get('[data-cy="stick-note-button-0"]').click();
    cy.get('[data-cy="stick-note-text-0"]').should('not.exist');
    cy.get('[data-cy="task-some task to do"]').should('have.text', taskContent);
  });

  it('Should load a task from local storage', () => {
    cy.visit(Cypress.env('BASE_URL'));
    const taskContent = 'some task to do 1';
    cy.get('[data-cy="task-add-button-input"]').type(taskContent, {
      delay: 30,
    });
    cy.get('[data-cy="task-add-button-input"]').type('{enter}', { delay: 30 });
    cy.wait(3000);
    cy.reload();
    cy.wait(3000);
    cy.get('[data-cy="task-some task to do 1"]').should(
      'have.text',
      taskContent,
    );
  });

  it('Should add a four new task and active three of them', () => {
    const taskContentOne: string = 'some task to do 1';
    const taskContentTwo: string = 'some task to do 2';
    const taskContentThree: string = 'some task to do 3';
    const taskContentFour: string = 'some task to do 4';
    cy.visit(Cypress.env('BASE_URL'));

    cy.get('[data-cy="task-add-button-input"]').type(taskContentOne);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentOne}"]`).trigger('mouseover');
    cy.get(`[data-cy="button-active"]`).click();

    cy.get('[data-cy="task-add-button-input"]').type(taskContentTwo);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentTwo}"]`).trigger('mouseover');
    cy.get(`[data-cy="button-active"]`).click();

    cy.get('[data-cy="task-add-button-input"]').type(taskContentThree);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentThree}"]`).trigger('mouseover');
    cy.get(`[data-cy="button-active"]`).click();

    cy.get('[data-cy="task-add-button-input"]').type(taskContentFour);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get('[data-cy="stick-note-button-0"]').should('be.visible');
    cy.get('[data-cy="stick-note-text-0"]').should(
      'have.text',
      taskContentOne.toUpperCase(),
    );

    cy.get('[data-cy="stick-note-button-1"]').should('be.visible');
    cy.get('[data-cy="stick-note-text-1"]').should(
      'have.text',
      taskContentTwo.toUpperCase(),
    );

    cy.get('[data-cy="stick-note-button-2"]').should('be.visible');
    cy.get('[data-cy="stick-note-text-2"]').should(
      'have.text',
      taskContentThree.toUpperCase(),
    );
  });

  it('Should add a four new task and try to active four of them', () => {
    const taskContentOne: string = 'some task to do 1';
    const taskContentTwo: string = 'some task to do 2';
    const taskContentThree: string = 'some task to do 3';
    const taskContentFour: string = 'some task to do 4';
    cy.visit(Cypress.env('BASE_URL'));

    cy.get('[data-cy="task-add-button-input"]').type(taskContentOne);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentOne}"]`).trigger('mouseover');
    cy.get(`[data-cy="button-active"]`).click();

    cy.get('[data-cy="task-add-button-input"]').type(taskContentTwo);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentTwo}"]`).trigger('mouseover');
    cy.get(`[data-cy="button-active"]`).click();

    cy.get('[data-cy="task-add-button-input"]').type(taskContentThree);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentThree}"]`).trigger('mouseover');
    cy.get(`[data-cy="button-active"]`).click();

    cy.get('[data-cy="task-add-button-input"]').type(taskContentFour);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentFour}"]`).trigger('mouseover');
    cy.get(`[data-cy="button-active"]`).click();

    cy.get('[data-cy="stick-note-button-0"]').should('be.visible');
    cy.get('[data-cy="stick-note-text-0"]').should(
      'have.text',
      taskContentOne.toUpperCase(),
    );

    cy.get('[data-cy="stick-note-button-1"]').should('be.visible');
    cy.get('[data-cy="stick-note-text-1"]').should(
      'have.text',
      taskContentTwo.toUpperCase(),
    );

    cy.get('[data-cy="stick-note-button-2"]').should('be.visible');
    cy.get('[data-cy="stick-note-text-2"]').should(
      'have.text',
      taskContentThree.toUpperCase(),
    );

    cy.get(`[data-cy="task-${taskContentFour}"]`).should(
      'have.text',
      taskContentFour,
    );
  });

  it('Should add a new task and them cancel it', () => {
    const taskContentOne: string = 'some task to do 1';
    cy.visit(Cypress.env('BASE_URL'));

    cy.get('[data-cy="task-add-button-input"]').type(taskContentOne);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentOne}"]`).trigger('mouseover');
    cy.get(`[data-cy="button-cancel"]`).click();

    cy.get('[data-cy="task-some task to do 1"]').should(
      'have.text',
      taskContentOne,
    );
  });
});

export {};
