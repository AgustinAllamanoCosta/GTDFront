import React from 'react';
import { ItemAddButtonWithOptions } from './ItemButtonWithOptions';

describe('Should render a add task input and show the character limit when is focused', () => {
  it('render a card with title, subtitle and content', () => {
    let actionWasExecuted: boolean = false;
    let isDaily: boolean = false;
    let value: string = '';

    const characterLimit: number = 43;
    const testID: string = 'task-add-button-input';
    const testButtonAcceptID: string = 'button-accept';
    const testButtonMakeDailyID: string = 'button-make daily';
    const characterCounterTestID: string = 'task-add-button-character-counter';

    const inputAction = () => {
      actionWasExecuted = true;
    };
    const inputOnChange = (event: any) => {
      value = event;
    };
    const inputOnMackeDaily = () => {
      isDaily = false;
    };

    cy.mount(
      <ItemAddButtonWithOptions
        action={inputAction}
        onChange={inputOnChange}
        onMakeDaily={inputOnMackeDaily}
        disable={false}
        characterLimit={characterLimit}
        value={value}
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
