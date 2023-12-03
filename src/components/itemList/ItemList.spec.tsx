import React from 'react';
import { ItemList } from './ItemList';
import { Task } from '../../views/main/Main';

describe('Item List', () => {
  it('render a list of item with a add button at the end', () => {
    const listTitle: string = 'Some list title';
    const item: Task = {
      title: 'do some chore',
      isComplete: false,
    };
    const buttonText: string = 'Add Task';
    cy.mount(
      <ItemList
        title={listTitle}
        items={[item]}
      />,
    );
    cy.get('[data-cy="Card-title"]').should('have.text', listTitle);
    cy.get('[data-cy="task-do some chore"]').should('have.text', item.title);
    cy.get('[data-cy="task-add-button-input"]').should(
      'have.attr',
      'placeholder',
      buttonText,
    );
  });
});
