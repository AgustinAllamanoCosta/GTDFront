import {
  prepearEnvironment,
  addANewTaskByEnter,
  gotToTask,
  splitATaskByContent,
} from './testSupports.cy';

describe('Get The Things Done Split Tasks', () => {
  beforeEach(() => {
    prepearEnvironment();
  });

  it('Should split an existing task', () => {
    const taskContent: string = 'task to split';
    const subTaskContentOne: string = 'sub task to split one';
    const subTaskContentTwo: string = 'sub task to split two';
    gotToTask();

    addANewTaskByEnter(taskContent);
    splitATaskByContent(taskContent, subTaskContentOne, subTaskContentTwo);

    cy.get(`[data-cy="task-${taskContent}"]`).should('have.text', taskContent);
    cy.get(`[data-cy="task-${subTaskContentOne}"]`).should(
      'have.text',
      subTaskContentOne,
    );
    cy.get(`[data-cy="task-${subTaskContentTwo}"]`).should(
      'have.text',
      subTaskContentTwo,
    );
  });

  it('Should not split an existing task with only one input complete', () => {
    const taskContent: string = 'task to split';
    const subTaskContentOne: string = 'sub task to split one';
    gotToTask();

    addANewTaskByEnter(taskContent);
    cy.get(`[data-cy="task-${taskContent}"]`).click();

    cy.get(`[data-cy="button-split"]`).click();

    cy.get('[data-cy="task-add-button-task1"]').type(subTaskContentOne);

    cy.get(`[data-cy="button-split"]`).click();

    cy.get(`[data-cy="task-${taskContent}"]`).should('have.text', taskContent);
    cy.get(`[data-cy="task-${subTaskContentOne}"]`).should('not.exist');
  });

  it('Should scroll into the item when is clicked', () => {
    const taskContentOne: string = 'some task to do 1';
    const taskContentTwo: string = 'some task to do 2';
    const taskContentThree: string = 'some task to do 3';
    const taskContentFour: string = 'some task to do 4';
    const taskContentFive: string = 'some task to do 5';
    const taskContentSixe: string = 'some task to do 6';
    const taskContentSeven: string = 'some task to do 7';
    const taskContentEight: string = 'some task to do 8';
    const taskContentNine: string = 'some task to do 9';
    const taskContentTen: string = 'some task to do 10';
    const taskContentEleven: string = 'some task to do 11';
    const taskContentTwelve: string = 'some task to do 12';
    const taskContentThirteen: string = 'some task to do 13';
    const taskContentFourteen: string = 'some task to do 14';
    const taskContentFiftteen: string = 'some task to do 15';
    gotToTask();

    addANewTaskByEnter(taskContentOne);
    addANewTaskByEnter(taskContentTwo);
    addANewTaskByEnter(taskContentThree);
    addANewTaskByEnter(taskContentFour);
    addANewTaskByEnter(taskContentFive);
    addANewTaskByEnter(taskContentSixe);
    addANewTaskByEnter(taskContentSeven);
    addANewTaskByEnter(taskContentEight);
    addANewTaskByEnter(taskContentNine);
    addANewTaskByEnter(taskContentTen);
    addANewTaskByEnter(taskContentEleven);
    addANewTaskByEnter(taskContentTwelve);
    addANewTaskByEnter(taskContentThirteen);
    addANewTaskByEnter(taskContentFourteen);
    addANewTaskByEnter(taskContentFiftteen);

    cy.get(`[data-cy="task-${taskContentEleven}"]`).click();

    cy.get(`[data-cy="button-split"]`).should('be.visible');
  });
});

export {};
