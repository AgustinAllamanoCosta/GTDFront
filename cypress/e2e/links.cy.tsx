import { configViewPorts } from './testSupports.cy';

describe('Get The Things Done Links', () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    configViewPorts();
  });

  it('Should redicrect to the repo', () => {
    cy.visit('/');
    cy.get('[data-cy="User-Card-Header"] > [data-cy="Card-title"]').should(
      'have.attr',
      'href',
      'https://github.com/AgustinAllamanoCosta/GTDFront',
    );
  });
});

export {};
