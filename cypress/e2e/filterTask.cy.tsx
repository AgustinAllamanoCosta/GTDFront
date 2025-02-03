import { skipOn } from '@cypress/skip-test';
import {
  chargeInboxTaskOnFirebase,
  gotToTask,
  prepearDesktopEnvironment,
  skipOnMoviel,
} from './testSupports.cy';
describe('Get The Things Done Filter', () => {
  beforeEach(() => {
    prepearDesktopEnvironment();
  });

  it('Should filter a task by the content', () => {
    skipOnMoviel();
    const dummyTaskContent: Array<string> = [
      'some task',
      'another task',
      'another awesome task',
    ];
    chargeInboxTaskOnFirebase(dummyTaskContent);

    gotToTask();
    cy.get(`[data-cy="input-filter"]`).type(dummyTaskContent[1]);

    cy.get(`[data-cy="task-${dummyTaskContent[1]}"]`).should('exist');
    cy.get(`[data-cy="task-${dummyTaskContent[2]}"]`).should('not.exist');
    cy.get(`[data-cy="task-${dummyTaskContent[0]}"]`).should('not.exist');
  });

  it('Should filter the task not matching with the filter', () => {
    skipOnMoviel();
    const dummyTaskContent: Array<string> = [
      'some task',
      'another task',
      'another awesome task',
    ];
    chargeInboxTaskOnFirebase(dummyTaskContent);

    gotToTask();
    cy.get(`[data-cy="input-filter"]`).type('another');

    cy.get(`[data-cy="task-${dummyTaskContent[0]}"]`).should('not.exist');
    cy.get(`[data-cy="task-${dummyTaskContent[1]}"]`).should('exist');
    cy.get(`[data-cy="task-${dummyTaskContent[2]}"]`).should('exist');
  });
});

export {};
