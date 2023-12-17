import React from 'react';
import { ActiveTask } from './ActiveTask';
import {
  TaskContext,
  mockTaskInContext,
} from '../../storybook/decorators/tasks';

describe('Active Task List with active task', () => {
  it('render Active task with thre active task inside', async () => {
    cy.mount(
      <TaskContext>
        <ActiveTask />
      </TaskContext>,
    );
    cy.get(':nth-child(1) > .sc-hbwYeq > [data-cy="stick-note-text"]').should(
      'have.text',
      mockTaskInContext[0].title.toUpperCase(),
    );
    cy.get(':nth-child(2) > .sc-hbwYeq > [data-cy="stick-note-text"]').should(
      'have.text',
      mockTaskInContext[1].title.toUpperCase(),
    );
    cy.get(':nth-child(3) > .sc-hbwYeq > [data-cy="stick-note-text"]').should(
      'have.text',
      mockTaskInContext[2].title.toUpperCase(),
    );
  });
});
