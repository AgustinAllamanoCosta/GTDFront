import React from 'react';
import { ActiveTask } from './ActiveTask';
import { Task } from '../../views/main/Main';

describe('Active Task List with active task', () => {
  it('render Active task with thre active task inside', async () => {
    const activeTaskList: Array<Task> = [
      {
        title: 'Task 1',
        isComplete: false,
      },
      {
        title: 'Task 2',
        isComplete: false,
      },
      {
        title: 'Task 3',
        isComplete: false,
      },
    ];
    cy.mount(<ActiveTask task_list={activeTaskList} />);
    cy.get(':nth-child(1) > [data-cy="stick-note-text"]').should(
      'have.text',
      activeTaskList[0].title.toUpperCase(),
    );
    cy.get(':nth-child(2) > [data-cy="stick-note-text"]').should(
      'have.text',
      activeTaskList[1].title.toUpperCase(),
    );
    cy.get(':nth-child(3) > [data-cy="stick-note-text"]').should(
      'have.text',
      activeTaskList[2].title.toUpperCase(),
    );
  });
});
