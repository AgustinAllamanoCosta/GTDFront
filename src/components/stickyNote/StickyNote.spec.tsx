import React from 'react';
import { StickyNote } from './StickyNote';

describe('StickNote with title and subtitle', () => {
  it('render a card with title and sub title', () => {
    const stickText: string = 'Some title';
    cy.mount(<StickyNote text={stickText} />);
    cy.get('[data-cy="stick-note-text"]').should(
      'have.text',
      stickText.toUpperCase(),
    );
  });
});
