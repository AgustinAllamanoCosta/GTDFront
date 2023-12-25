import React from 'react';
import { StickyNote } from './StickyNote';

describe('StickNote with title and subtitle', () => {
  it('render a card with title and sub title', () => {
    const stickText: string = 'Some title';
    const addInfo: string = 'add description';
    cy.mount(
      <StickyNote
        text={stickText}
        onConfirm={() => {}}
      />,
    );
    cy.get('[data-cy="stick-note-text"]').should(
      'have.text',
      stickText.toUpperCase(),
    );
    cy.get('[data-cy="stick-note-text"]').type(addInfo);
    cy.get('[data-cy="stick-note-button"]').click();
  });
});
