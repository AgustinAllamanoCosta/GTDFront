describe('Get The Things Done Split Tasks', () => {
  beforeEach(() => {
    cy.testCleanDb();
    window.localStorage.clear();
    if (Cypress.env('isMobile')) {
      cy.viewport(400, 790);
      cy.log('Mobile view');
    } else {
      cy.viewport(1700, 1000);
      cy.log('Desktop view');
    }
  });

  after(() => {
    cy.testCleanDb();
    window.localStorage.clear();
  });

  it('Should split an existing task', () => {
    const taskContent: string = 'task to split';
    const subTaskContentOne: string = 'sub task to split one';
    const subTaskContentTwo: string = 'sub task to split two';

    cy.visit('/');
    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');
    cy.get(`[data-cy="task-${taskContent}"]`).click();

    cy.get(`[data-cy="button-split"]`).click();

    cy.get('[data-cy="task-add-button-task1"]').type(subTaskContentOne);
    cy.get('[data-cy="task-add-button-task2"]').type(subTaskContentTwo);

    cy.get(`[data-cy="button-split"]`).click();

    cy.get(`[data-cy="task-${taskContent}"]`).should('have.text', taskContent);
    cy.get(`[data-cy="task-${subTaskContentOne}"]`).should(
      'have.text',
      subTaskContentOne,
    );
    cy.get(`[data-cy="task-${subTaskContentTwo}"]`).should(
      'have.text',
      subTaskContentTwo,
    );
  });

  it('Should not split an existing task', () => {
    const taskContent: string = 'task to split';
    const subTaskContentOne: string = 'sub task to split one';

    cy.visit('/');
    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');
    cy.get(`[data-cy="task-${taskContent}"]`).click();

    cy.get(`[data-cy="button-split"]`).click();

    cy.get('[data-cy="task-add-button-task1"]').type(subTaskContentOne);

    cy.get(`[data-cy="button-cancel"]`).click();

    cy.get(`[data-cy="task-${taskContent}"]`).should('have.text', taskContent);
    cy.get(`[data-cy="task-${subTaskContentOne}"]`).should('not.exist');
  });

  it('Should not split an existing task with only one input complete', () => {
    const taskContent: string = 'task to split';
    const subTaskContentOne: string = 'sub task to split one';

    cy.visit('/');
    cy.get('[data-cy="task-add-button-input"]').type(taskContent);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');
    cy.get(`[data-cy="task-${taskContent}"]`).click();

    cy.get(`[data-cy="button-split"]`).click();

    cy.get('[data-cy="task-add-button-task1"]').type(subTaskContentOne);

    cy.get(`[data-cy="button-split"]`).click();

    cy.get(`[data-cy="task-${taskContent}"]`).should('have.text', taskContent);
    cy.get(`[data-cy="task-${subTaskContentOne}"]`).should('not.exist');
  });

  it('Should scroll into the item when is clicked', () => {
    const taskContentOne: string = 'some task to do 1';
    const taskContentTwo: string = 'some task to do 2';
    const taskContentThree: string = 'some task to do 3';
    const taskContentFour: string = 'some task to do 4';
    const taskContentFive: string = 'some task to do 5';
    const taskContentSixe: string = 'some task to do 6';
    const taskContentSeven: string = 'some task to do 7';
    const taskContentEight: string = 'some task to do 8';
    const taskContentNine: string = 'some task to do 9';
    const taskContentTeen: string = 'some task to do 10';
    const taskContentEleven: string = 'some task to do 11';
    const taskContentTwelve: string = 'some task to do 12';
    const taskContentThirteen: string = 'some task to do 13';
    const taskContentFourteen: string = 'some task to do 14';
    const taskContentFiftteen: string = 'some task to do 15';

    cy.visit('/');

    cy.get('[data-cy="task-add-button-input"]').type(taskContentOne);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get('[data-cy="task-add-button-input"]').type(taskContentTwo);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get('[data-cy="task-add-button-input"]').type(taskContentThree);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get('[data-cy="task-add-button-input"]').type(taskContentFour);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get('[data-cy="task-add-button-input"]').type(taskContentFive);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get('[data-cy="task-add-button-input"]').type(taskContentSixe);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get('[data-cy="task-add-button-input"]').type(taskContentSeven);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get('[data-cy="task-add-button-input"]').type(taskContentEight);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get('[data-cy="task-add-button-input"]').type(taskContentNine);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get('[data-cy="task-add-button-input"]').type(taskContentTeen);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get('[data-cy="task-add-button-input"]').type(taskContentEleven);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get('[data-cy="task-add-button-input"]').type(taskContentTwelve);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get('[data-cy="task-add-button-input"]').type(taskContentThirteen);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get('[data-cy="task-add-button-input"]').type(taskContentFourteen);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get('[data-cy="task-add-button-input"]').type(taskContentFiftteen);
    cy.get('[data-cy="task-add-button-input"]').type('{enter}');

    cy.get(`[data-cy="task-${taskContentThree}"]`).click();

    cy.get(`[data-cy="button-split"]`).should('be.visible');
  });
});

export {};
