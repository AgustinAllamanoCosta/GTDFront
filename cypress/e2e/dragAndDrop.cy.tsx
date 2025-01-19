import { skipOn } from '@cypress/skip-test';
import {
  activeATaskDoingDropping,
  addANewTaskByEnter,
  cleanDB,
  gotToTask,
} from './testSupports.cy';

const skipOnMoviel = () => {
  if (Cypress.env('isMobile')) {
    skipOn(true);
  }
};

describe('Get The Things Done Drag and Drop', () => {
  beforeEach(() => {
    cy.wrap(null).then(async () => {
      await cleanDB();
    });
    window.localStorage.clear();
    cy.viewport(1700, 1000);
    cy.log('Using desktop view with drag and drop test');
  });

  it('Should active an Item when is drop on the active zone', () => {
    skipOnMoviel();
    const taskContent = 'task to active';
    gotToTask();
    addANewTaskByEnter(taskContent);

    activeATaskDoingDropping(taskContent);

    cy.get('[data-cy="stick-note-text-0"]').should(
      'have.text',
      taskContent.toUpperCase(),
    );
  });

  it('Should mark a task as done using drag and drop', () => {
    skipOnMoviel();
    const taskContent = 'task to done';
    gotToTask();
    addANewTaskByEnter(taskContent);

    activeATaskDoingDropping(taskContent);

    const item = cy
      .get(`[data-cy="stick-note-text-0"]`)
      .trigger('mousedown')
      .wait(100);
    let listPosition = undefined;
    const activeList = cy.get('[data-cy="Done-task-list"]').then((list) => {
      listPosition = list.position();
    });
    activeList.trigger('mousemove', listPosition);
    item.trigger('mouseup');
  });

  it('Should mark a task as cancel using drag and drop', () => {
    skipOnMoviel();
    const taskContent = 'task to cancel';
    gotToTask();

    addANewTaskByEnter(taskContent);

    const item = cy
      .get(`[data-cy="task-${taskContent}"]`)
      .trigger('mousedown')
      .wait(100);
    let listPosition = undefined;
    const activeList = cy.get('[data-cy="Cancel-task-list"]').then((list) => {
      listPosition = list.position();
    });
    activeList.trigger('mousemove', listPosition);
    item.trigger('mouseup');
  });

  it('Should active an 3 Item when is drop on the active zone', () => {
    skipOnMoviel();
    const taskContentOne = 'task to active one';
    const taskContentTwo = 'task to active two';
    const taskContentThree = 'task to active three';
    gotToTask();

    addANewTaskByEnter(taskContentOne);
    addANewTaskByEnter(taskContentTwo);
    addANewTaskByEnter(taskContentThree);

    activeATaskDoingDropping(taskContentOne);
    activeATaskDoingDropping(taskContentTwo);
    activeATaskDoingDropping(taskContentThree);

    cy.get('[data-cy="stick-note-text-0"]').should(
      'have.text',
      taskContentOne.toUpperCase(),
    );
    cy.get('[data-cy="stick-note-text-1"]').should(
      'have.text',
      taskContentTwo.toUpperCase(),
    );
    cy.get('[data-cy="stick-note-text-2"]').should(
      'have.text',
      taskContentThree.toUpperCase(),
    );
  });

  it('Should active 3 Item of 4 when is drop on the active zone', () => {
    skipOnMoviel();
    const taskContentOne = 'task to active one';
    const taskContentTwo = 'task to active two';
    const taskContentThree = 'task to active three';
    const taskContentFour = 'task to active four';
    gotToTask();

    addANewTaskByEnter(taskContentOne);
    addANewTaskByEnter(taskContentTwo);
    addANewTaskByEnter(taskContentThree);
    addANewTaskByEnter(taskContentFour);

    activeATaskDoingDropping(taskContentOne);
    activeATaskDoingDropping(taskContentTwo);
    activeATaskDoingDropping(taskContentThree);
    activeATaskDoingDropping(taskContentFour);

    cy.get('[data-cy="stick-note-text-0"]').should(
      'have.text',
      taskContentOne.toUpperCase(),
    );
    cy.get('[data-cy="stick-note-text-1"]').should(
      'have.text',
      taskContentTwo.toUpperCase(),
    );
    cy.get('[data-cy="stick-note-text-2"]').should(
      'have.text',
      taskContentThree.toUpperCase(),
    );
    cy.get(`[data-cy="task-${taskContentFour}"]`).should(
      'have.text',
      taskContentFour,
    );
  });
});

export {};
