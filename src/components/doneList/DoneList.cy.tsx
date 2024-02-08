import React from 'react';
import { mockDoneTaskInContext, task5 } from '../../storybook/decorators/tasks';
import DoneList from './DoneList';
import ItemsContext from '../useItems/useItems';
import { BrowserRouter } from 'react-router-dom';

describe('Done List', () => {
  it('render a list of done item with a add button at the end', () => {
    const listTitle: string = 'Done';
    cy.mount(
      <BrowserRouter>
        <ItemsContext defaultDoneItems={mockDoneTaskInContext}>
          <DoneList />
        </ItemsContext>
      </BrowserRouter>,
    );
    cy.get('[data-cy="Card-title"]').should('have.text', listTitle);
    cy.get('[data-cy="task-some task 5"]').should('have.text', task5.title);
  });
});
