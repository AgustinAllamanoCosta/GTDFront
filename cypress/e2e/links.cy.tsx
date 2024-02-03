describe('Get The Things Done', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  beforeEach(() => {
    if (Cypress.env('isMobile')) {
      cy.viewport(790, 790);
      cy.log('Mobile view');
    } else {
      cy.viewport(1000, 1000);
      cy.log('Desktop view');
    }
  });

  it('Should redicrect to the repo', () => {
    cy.visit(Cypress.env('BASE_URL'));
    cy.get('[data-cy="User-Card-Header"] > [data-cy="Card-title"]').should(
      'have.attr',
      'href',
      'https://github.com/AgustinAllamanoCosta/GTDFront',
    );
  });
});

export {};
