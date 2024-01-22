const USER_NAME: string = 'Test User';
const URL: string = 'http://localhost:8080/';

describe('Get The Things Done', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  beforeEach(() => {
    cy.log('Logging in to Google');
    cy.viewport(800, 800);
  });

  it('Should redicrect to the repo', () => {
    cy.visit(URL);
    cy.get(
      '[data-cy="User-Card-Header-Container-title"] > [data-cy="Card-title"]',
    ).should(
      'have.attr',
      'href',
      'https://github.com/AgustinAllamanoCosta/GTDFront',
    );
  });
});

export {};
