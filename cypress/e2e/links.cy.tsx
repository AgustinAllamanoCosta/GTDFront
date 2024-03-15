describe('Get The Things Done Links', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  beforeEach(() => {
    if (Cypress.env('isMobile')) {
      cy.viewport(400, 790);
      cy.log('Mobile view');
    } else {
      cy.viewport(1700, 1000);
      cy.log('Desktop view');
    }
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
