import React from 'react';
import { Card } from './Card';

describe('Card with title and subtitle', () => {
  it('render a card with title and sub title', () => {
    const title: string = 'Some title';
    const subTitle: string = 'Some sub title';
    cy.mount(
      <Card
        title={title}
        sub_title={subTitle}
      />,
    );
    cy.get('[data-cy="Card-title"]').should('have.text', title);
    cy.get('[data-cy="Card-SubTitle"]').should('have.text', subTitle);
  });

  it('render a card with only a title', async () => {
    const title: string = 'Some title';
    cy.mount(<Card title={title} />);
    cy.get('[data-cy="Card-title"]').should('have.text', title);
    cy.get('[data-cy="Card-SubTitle"]').should('be.undefined');
  });

  it('render a card with only a subTitle', async () => {
    const subTitle: string = 'Some sub title';
    cy.mount(<Card sub_title={subTitle} />);
    cy.get('[data-cy="Card-title"]').should('be.undefined');
    cy.get('[data-cy="Card-SubTitle"]').should('have.text', subTitle);
  });

  it('render a card with only a content', async () => {
    const content = <span data-cy="content">SOME CONTENT</span>;
    cy.mount(<Card>{content}</Card>);
    cy.get('[data-cy="content"]').should('have.text', 'SOME CONTENT');
  });

  it('render a card with title, subtitle and content', async () => {
    const content = <span data-cy="content">SOME CONTETN</span>;
    const title: string = 'Some title';
    const subTitle: string = 'Some sub title';
    cy.mount(
      <Card
        sub_title={subTitle}
        title={title}
      >
        {content}
      </Card>,
    );
    cy.get('[data-cy="Card-title"]').should('have.text', title);
    cy.get('[data-cy="Card-SubTitle"]').should('have.text', subTitle);
    cy.get('[data-cy="content"]').should('have.text', 'SOME CONTETN');
  });
});
