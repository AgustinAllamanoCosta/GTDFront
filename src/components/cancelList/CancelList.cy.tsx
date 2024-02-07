import React from 'react';
import { mockCancelTaskInContext } from '../../storybook/decorators/tasks';
import { CancelList } from './CancelList';
import ItemsContext from '../useItems/useItems';
import { BrowserRouter } from 'react-router-dom';

describe('Cancel List', () => {
  it('render a list of cancel item with a add button at the end', () => {
    const listTitle: string = 'Cancel';
    cy.mount(
      <BrowserRouter>
        <ItemsContext defaultCancelItems={mockCancelTaskInContext}>
          <CancelList />
        </ItemsContext>
      </BrowserRouter>,
    );
    cy.get('[data-cy="Card-title"]').should('have.text', listTitle);
    cy.get('[data-cy="task-some task 4"]').should(
      'have.text',
      mockCancelTaskInContext[0].title,
    );
  });
});
