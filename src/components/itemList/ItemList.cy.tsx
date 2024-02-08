import React from 'react';
import { mockTaskInContext, task1 } from '../../storybook/decorators/tasks';
import ItemList from './ItemList';
import ItemsContext from '../useItems/useItems';
import { BrowserRouter } from 'react-router-dom';

describe('Item List', () => {
  it('render a list of item with a add button at the end', () => {
    const listTitle: string = 'Inbox';
    const buttonText: string = 'Add Task';
    cy.mount(
      <BrowserRouter>
        <ItemsContext defaultItems={mockTaskInContext}>
          <ItemList />
        </ItemsContext>
      </BrowserRouter>,
    );
    cy.get('[data-cy="Card-title"]').should('have.text', listTitle);
    cy.get('[data-cy="task-some task 1"]').should('have.text', task1.title);
    cy.get('[data-cy="task-add-button-input"]').should(
      'have.attr',
      'placeholder',
      buttonText,
    );
  });
});
