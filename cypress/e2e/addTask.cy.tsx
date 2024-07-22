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

  afterEach(() => {
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

  it('Should add a four new task and active three of them', () => {
    const taskContentOne: string = 'some task to do 1';
    const taskContentTwo: string = 'some task to do 2';
    const taskContentThree: string = 'some task to do 3';
    const taskContentFour: string = 'some task to do 4';
    cy.visit('/task');
    cy.wait(1000);

    cy.get('[data-cy="task-add-button-input"]').type(taskContentOne);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentOne}"]`).click();
    cy.get(`[data-cy="button-active"]`).click();

    cy.get('[data-cy="task-add-button-input"]').type(taskContentTwo);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentTwo}"]`).click();
    cy.get(`[data-cy="button-active"]`).click();

    cy.get('[data-cy="task-add-button-input"]').type(taskContentThree);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentThree}"]`).click();
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
    cy.visit('/task');
    cy.wait(1000);

    cy.get('[data-cy="task-add-button-input"]').type(taskContentOne);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentOne}"]`).click();
    cy.get(`[data-cy="button-active"]`).click();

    cy.get('[data-cy="task-add-button-input"]').type(taskContentTwo);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentTwo}"]`).click();
    cy.get(`[data-cy="button-active"]`).click();

    cy.get('[data-cy="task-add-button-input"]').type(taskContentThree);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentThree}"]`).click();
    cy.get(`[data-cy="button-active"]`).click();

    cy.get('[data-cy="task-add-button-input"]').type(taskContentFour);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentFour}"]`).click();
    cy.get(`[data-cy="button-active"]`).click();

    cy.wait(1000);

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

  it('Should add a daily task and mark as complete and reapear in inbox task and in the done list', () => {
    const taskContent: string = 'some task to do';
    cy.clock(new Date().getTime(), ['setInterval', 'setTimeout', 'Date']);
    cy.visit('/task');

    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="button-make daily"]').click();
    cy.tick(100);

    cy.get('[data-cy="task-some task to do"]').click();
    cy.get('[data-cy="button-active"]').click();
    cy.tick(100);

    cy.get('[data-cy="stick-note-button-0"]').click();

    cy.tick(48 * (1000 * 60 * 60));

    cy.get('[data-cy="stick-note-text-0"]').should('not.exist');
    cy.get('[data-cy="task-some task to do"]').should('have.length', 2);
  });

  it('Should not add a schedule task if the task is in the inbox list', () => {
    const taskContent: string = 'some task to do';
    cy.clock(new Date().getTime(), ['setInterval', 'Date']);
    cy.visit('/task');

    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="button-make daily"]').click();

    cy.tick(48 * (1000 * 60 * 60));

    cy.get('[data-cy="task-some task to do"]').should('have.length', 1);
  });

  it('Should cancel a daily task and not appear again', () => {
    const taskContent: string = 'some task to do';

    cy.clock(new Date().getTime(), ['setInterval', 'setTimeout', 'Date']);
    cy.visit('/task');

    cy.get('[data-cy="task-add-button-input"]', { timeout: 1000 }).type(
      taskContent,
    );
    cy.get('[data-cy="button-make daily"]', { timeout: 1000 }).click();

    cy.get('[data-cy="task-some task to do"]', { timeout: 1000 }).click();
    cy.get('[data-cy="button-cancel"]', { timeout: 1000 }).click();

    cy.tick(48 * (1000 * 60 * 60));

    cy.get('[data-cy="stick-note-text-0"]', { timeout: 1000 }).should(
      'not.exist',
    );
    cy.get('[data-cy="task-some task to do"]', { timeout: 1000 }).should(
      'have.length',
      1,
    );
  });

  it('Should add task, active and change the temp to warn', () => {
    const taskContent: string = 'some task to do';

    cy.clock(new Date().getTime(), ['setInterval', 'setTimeout', 'Date']);

    cy.visit('/task');

    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="button-make daily"]').click();

    cy.get('[data-cy="task-some task to do"]').click();
    cy.get('[data-cy="button-active"]').click();

    cy.tick(13 * (1000 * 60 * 60));

    cy.get('[data-cy="stick-note-container-0"]').should(
      'have.css',
      'background-color',
      'rgb(121, 119, 181)',
    );
  });
});

export {};
