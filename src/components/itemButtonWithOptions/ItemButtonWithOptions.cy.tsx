import React from 'react';
import { InputWithActions } from './ItemButtonWithOptions';

describe('Should render a add task input and show the character limit when is focused', () => {
  it('render a card with title, subtitle and content', () => {
    let actionWasExecuted: boolean = false;
    let isDaily: boolean = false;

    const characterLimit: number = 43;
    const testID: string = 'task-add-button-input';
    const testButtonAcceptID: string = 'button-accept';
    const testButtonMakeDailyID: string = 'button-make daily';
    const characterCounterTestID: string = 'task-add-button-character-counter';

    const inputAction = (value: string) => {
      actionWasExecuted = true;
    };
    const inputOnMackeDaily = (value: string) => {
      isDaily = false;
    };

    cy.mount(
      <InputWithActions
        action={inputAction}
        onMakeDaily={inputOnMackeDaily}
        disable={false}
        characterLimit={characterLimit}
        dataTest={'component'}
      />,
    );

    cy.get(`[data-cy="${testID}"]`).click();

    cy.get(`[data-cy="${characterCounterTestID}"]`).should(
      'have.text',
      characterLimit,
    );
    cy.get(`[data-cy="${testButtonAcceptID}"]`).should('be.visible');
    cy.get(`[data-cy="${testButtonMakeDailyID}"]`).should('be.visible');
  });
});
