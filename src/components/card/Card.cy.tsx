import React from 'react';
import { Card } from './Card';

describe('Card with content', () => {
  it('render a card with title, subtitle and content', async () => {
    const content = <span data-cy="content">SOME CONTETN</span>;
    cy.mount(<Card>{content}</Card>);
    cy.get('[data-cy="content"]').should('have.text', 'SOME CONTETN');
  });
});
