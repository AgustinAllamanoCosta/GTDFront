import {
  prepearEnvironment,
  cleanDB,
  activeATaskByContent,
  completeATaskByOrder,
  cancelATaskByContent,
} from './testSupports.cy';

const addADailyTask = (taskContent: string) => {
  cy.get('[data-cy="task-add-button-input"]').type(taskContent);
  cy.get('[data-cy="button-make daily"]').click();
};

describe('Get The Things Done Task Daily', () => {
  beforeEach(() => {
    cy.clock().then((clock) => {
      clock.restore();
    });
    prepearEnvironment();
  });

  afterEach(() => {
    cy.clock().then((clock) => {
      clock.restore();
    });
  });

  it.only('Should add a daily task and mark as complete and reapear in inbox task and in the done list', () => {
    const taskContent: string = 'some task to do';

    const initialTime = new Date('2024-01-01T00:00:00').getTime();
    cy.clock(initialTime, ['Date']);
    cy.visit('/task');

    cy.tick(100);
    addADailyTask(taskContent);

    cy.tick(100);
    activeATaskByContent(taskContent);

    cy.tick(48 * (1000 * 60 * 60));
    completeATaskByOrder(0);

    cy.tick(300);
    cy.get('[data-cy="stick-note-text-0"]').should('not.exist');
    cy.get('[data-cy="task-some task to do"]').should('have.length', 2);
  });

  it('Should not add a schedule task if the task is in the inbox list', () => {
    const taskContent: string = 'some task to do';
    cy.clock(new Date().getTime(), ['setInterval', 'Date']);
    cy.visit('/task');

    addADailyTask(taskContent);
    cy.tick(48 * (1000 * 60 * 60));

    cy.get('[data-cy="task-some task to do"]').should('have.length', 1);
  });

  it('Should cancel a daily task and not appear again', () => {
    const taskContent: string = 'some task to do';

    cy.clock(new Date().getTime(), ['setInterval', 'setTimeout', 'Date']);
    cy.visit('/task');

    addADailyTask(taskContent);
    cancelATaskByContent(taskContent);
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

    addADailyTask(taskContent);
    activeATaskByContent(taskContent);
    cy.tick(13 * (1000 * 60 * 60));

    cy.get('[data-cy="stick-note-container-0"]').should(
      'have.css',
      'background-color',
      'rgb(121, 119, 181)',
    );
  });
});

export {};
