import {
  prepearEnvironment,
  cancelATaskByContent,
  addANewTaskByEnter,
  completeATaskByOrder,
  activeATaskByContent,
  addANewTaskByButton,
  gotToTask,
} from './testSupports.cy';
describe('Get The Things Done Task', () => {
  beforeEach(() => {
    prepearEnvironment();
  });

  it('Should not add an empty task', () => {
    gotToTask();

    cy.get('[data-cy="task-add-button-input"]').click();
    cy.get('[data-cy="button-accept"]').click();

    cy.get('[data-cy="button-accept"]').should('not.exist');
    cy.get('[data-cy="task-"]').should('not.exist');
  });

  it('Should add a new task and add with accept button', () => {
    const taskContent: string = 'some task to do';
    gotToTask();

    addANewTaskByButton(taskContent);

    cy.get('[data-cy="button-accept"]').should('not.exist');
    cy.get('[data-cy="task-some task to do"]').should('have.text', taskContent);
  });

  it('Should add a new task', () => {
    const taskContent: string = 'some task to do';
    gotToTask();

    addANewTaskByEnter(taskContent);

    cy.get('[data-cy="task-some task to do"]').should('have.text', taskContent);
  });

  it('Should add a new task and active', () => {
    const taskContent: string = 'some task to do';
    gotToTask();

    addANewTaskByEnter(taskContent);
    activeATaskByContent(taskContent);

    cy.get('[data-cy="stick-note-button-0"]').should('be.visible');
    cy.get('[data-cy="stick-note-text-0"]').should(
      'have.text',
      taskContent.toUpperCase(),
    );
  });

  it('Should add a new task, active it and mark as complete', () => {
    const taskContent: string = 'some task to do';
    gotToTask();

    addANewTaskByEnter(taskContent);
    activeATaskByContent(taskContent);
    completeATaskByOrder(0);

    cy.get('[data-cy="stick-note-text-0"]').should('not.exist');
    cy.get('[data-cy="task-some task to do"]').should('have.text', taskContent);
  });

  it('Should add a new task and them cancel it', () => {
    const taskContentOne: string = 'some task to do 1';
    gotToTask();

    addANewTaskByEnter(taskContentOne);
    cancelATaskByContent(taskContentOne);

    cy.get('[data-cy="task-some task to do 1"]').should(
      'have.text',
      taskContentOne,
    );
  });
});

export {};
