import React from 'react';
import { THEME_ONE } from '../../constants/colors';
import { StickyNote } from './StickyNote';

describe('StickNote with title and subtitle', () => {
  it('render a card with title and sub title', () => {
    const stickText: string = 'Some title';
    const addInfo: string = 'add description';
    cy.mount(
      <StickyNote
        number="0"
        text={stickText}
        onConfirm={() => {}}
        backgroundColor={THEME_ONE.stickBackGround}
      />,
    );
    cy.get('[data-cy="stick-note-text-0"]').should(
      'have.text',
      stickText.toUpperCase(),
    );
    cy.get('[data-cy="stick-note-text-0"]').type(addInfo);
    cy.get('[data-cy="stick-note-button-0"]').click();
  });
});
