import React from 'react';
import { ActiveTask } from './ActiveTask';
import {
  TaskContext,
  mockTaskInContext,
} from '../../storybook/decorators/tasks';

describe('Active Task List with active task', () => {
  it('render Active task with thre active task inside', () => {
    cy.mount(
      <TaskContext>
        <ActiveTask />
      </TaskContext>,
    );
    cy.get('[data-cy="stick-note-text-0"]').should(
      'have.text',
      mockTaskInContext[0].title.toUpperCase(),
    );
    cy.get('[data-cy="stick-note-text-1"]').should(
      'have.text',
      mockTaskInContext[1].title.toUpperCase(),
    );
    cy.get('[data-cy="stick-note-text-2"]').should(
      'have.text',
      mockTaskInContext[2].title.toUpperCase(),
    );
  });
});
