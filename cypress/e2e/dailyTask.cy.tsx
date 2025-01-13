describe.skip('Get The Things Done Task Daily', () => {
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
    cy.clock().then((clock) => {
      clock.restore();
    });
  });

  after(() => {
    cy.testCleanDb();
    window.localStorage.clear();
  });

  it('Should add a daily task and mark as complete and reapear in inbox task and in the done list', () => {
    const taskContent: string = 'some task to do';

    const initialTime = new Date('2024-01-01T00:00:00').getTime();
    cy.clock(initialTime, ['Date']);
    cy.visit('/task');
    cy.tick(100);

    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="button-make daily"]').click();
    cy.tick(100);

    cy.get('[data-cy="task-some task to do"]').click();
    cy.get('[data-cy="button-active"]').click();

    cy.tick(48 * (1000 * 60 * 60));
    cy.get('[data-cy="stick-note-button-0"]').click();

    cy.tick(300);
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
