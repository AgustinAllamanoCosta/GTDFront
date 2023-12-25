import React from 'react';
import {
  TaskContext,
  mockTaskInContext,
} from '../../storybook/decorators/tasks';
import { ItemList } from './ItemList';

describe('Item List', () => {
  it('render a list of item with a add button at the end', () => {
    const listTitle: string = 'Some list title';
    const buttonText: string = 'Add Task';
    cy.mount(
      <TaskContext>
        <ItemList
          title={listTitle} 
        />
      </TaskContext>,
    );
    cy.get('[data-cy="Card-title"]').should('have.text', listTitle);
    cy.get('[data-cy="task-some task 1"]').should(
      'have.text',
      mockTaskInContext[0].title,
    );
    cy.get('[data-cy="task-add-button-input"]').should(
      'have.attr',
      'placeholder',
      buttonText,
    );
  });
});
