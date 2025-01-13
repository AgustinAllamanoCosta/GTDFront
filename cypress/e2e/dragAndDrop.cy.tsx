import { skipOn } from '@cypress/skip-test';

describe('Get The Things Done Drag and Drop', () => {
  beforeEach(() => {
    cy.testCleanDb();
    window.localStorage.clear();
    cy.viewport(1700, 1000);
    cy.log('Using desktop view with drag and drop test');
  });

  after(() => {
    cy.testCleanDb();
    window.localStorage.clear();
  });

  const skipOnMoviel = () => {
    if (Cypress.env('isMobile')) {
      skipOn(true);
    }
  };

  it('Should active an Item when is drop on the active zone', () => {
    skipOnMoviel();
    const taskContent = 'task to active';
    cy.visit('/task');
    cy.wait(1000);

    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="button-accept"]').click();

    activeATaskDoingDropping(taskContent);

    cy.get('[data-cy="stick-note-text-0"]').should(
      'have.text',
      taskContent.toUpperCase(),
    );
  });

  it('Should mark a task as done using drag and drop', () => {
    skipOnMoviel();
    const taskContent = 'task to done';
    cy.visit('/task');
    cy.wait(1000);

    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="button-accept"]').click();

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
    cy.visit('/task');
    cy.wait(1000);

    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="button-accept"]').click();

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
    cy.visit('/task');
    cy.wait(1000);

    cy.get('[data-cy="task-add-button-input"]').type(taskContentOne);
    cy.get('[data-cy="button-accept"]').click();

    cy.get('[data-cy="task-add-button-input"]').type(taskContentTwo);
    cy.get('[data-cy="button-accept"]').click();

    cy.get('[data-cy="task-add-button-input"]').type(taskContentThree);
    cy.get('[data-cy="button-accept"]').click();

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
    cy.visit('/task');
    cy.wait(1000);

    cy.get('[data-cy="task-add-button-input"]').type(taskContentOne);
    cy.get('[data-cy="button-accept"]').click();

    cy.get('[data-cy="task-add-button-input"]').type(taskContentTwo);
    cy.get('[data-cy="button-accept"]').click();

    cy.get('[data-cy="task-add-button-input"]').type(taskContentThree);
    cy.get('[data-cy="button-accept"]').click();

    cy.get('[data-cy="task-add-button-input"]').type(taskContentFour);
    cy.get('[data-cy="button-accept"]').click();

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

  const activeATaskDoingDropping = (taskId: string) => {
    const item = cy
      .get(`[data-cy="task-${taskId}"]`)
      .trigger('mousedown')
      .wait(100);
    let listPosition = undefined;
    const activeList = cy.get('[data-cy="Active-task-list"]').then((list) => {
      listPosition = list.position();
    });
    activeList.trigger('mousemove', listPosition);
    item.trigger('mouseup');
  };
});

export {};
