describe('Get The Things Done', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  beforeEach(() => {
    cy.log('Logging in to Google');
    cy.viewport(790, 790);
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
