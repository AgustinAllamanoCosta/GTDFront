import {
  prepearEnvironment,
  addANewTaskByEnter,
  activeATaskByContent,
  gotToTask,
} from './testSupports.cy';

describe('Get The Things Done Task Sec', () => {
  beforeEach(() => {
    prepearEnvironment();
  });

  it('Should add a four new task and active three of them', () => {
    const taskContentOne: string = 'some task to do 1';
    const taskContentTwo: string = 'some task to do 2';
    const taskContentThree: string = 'some task to do 3';
    const taskContentFour: string = 'some task to do 4';
    gotToTask();

    addANewTaskByEnter(taskContentOne);
    activeATaskByContent(taskContentOne);
    addANewTaskByEnter(taskContentTwo);
    activeATaskByContent(taskContentTwo);
    addANewTaskByEnter(taskContentThree);
    activeATaskByContent(taskContentThree);
    addANewTaskByEnter(taskContentFour);
    activeATaskByContent(taskContentFour);

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

  it('Should add a four new task and active three of them and the four task need to keep visible', () => {
    const taskContentOne: string = 'some task to do 1';
    const taskContentTwo: string = 'some task to do 2';
    const taskContentThree: string = 'some task to do 3';
    const taskContentFour: string = 'some task to do 4';
    gotToTask();

    addANewTaskByEnter(taskContentOne);
    activeATaskByContent(taskContentOne);
    addANewTaskByEnter(taskContentTwo);
    activeATaskByContent(taskContentTwo);
    addANewTaskByEnter(taskContentThree);
    activeATaskByContent(taskContentThree);
    addANewTaskByEnter(taskContentFour);
    activeATaskByContent(taskContentFour);

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
      'have.css',
      'opacity',
      '1',
    );
  });

  it.only('Should add a four new task and try to active four of them', () => {
    const taskContentOne: string = 'some task to do 1';
    const taskContentTwo: string = 'some task to do 2';
    const taskContentThree: string = 'some task to do 3';
    const taskContentFour: string = 'some task to do 4';
    gotToTask();

    addANewTaskByEnter(taskContentOne);
    addANewTaskByEnter(taskContentTwo);
    addANewTaskByEnter(taskContentThree);
    addANewTaskByEnter(taskContentFour);

    activeATaskByContent(taskContentOne);
    activeATaskByContent(taskContentTwo);
    activeATaskByContent(taskContentThree);
    activeATaskByContent(taskContentFour);

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
    cy.get('[data-cy="Toast"]').should(
      'have.text',
      'you need to complete a active task before to active a new one',
    );
  });
});

export {};
