import React from 'react';
import { Button } from './Button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

describe('Button with text', () => {
  it('render a button with only text', () => {
    const buttonText: string = 'Some button text';
    cy.mount(
      <Button
        text={buttonText}
        onClick={() => {}}
      />,
    );
    cy.get('[data-cy="button-text"]').should('have.text', buttonText);
  });

  it('render a button with only text and a function and when the button is clicked the function is executed', () => {
    const buttonText: string = 'Some button text';
    const onClickSpy = cy.spy().as('onClickSpy');

    cy.mount(
      <div data-cy="first div">
        <Button
          text={buttonText}
          onClick={onClickSpy}
        />
      </div>,
    );
    cy.get('[data-cy="button-gtd"]').click();

    cy.get('[data-cy="button-text"]').should('have.text', buttonText);
    cy.get('@onClickSpy').should('be.called');
  });

  it('render a button with text, icon and a function and when the button is clicked the function is executed and show the icon', () => {
    const buttonText: string = 'Some button text';
    const onClickSpy = cy.spy().as('onClickSpy');

    cy.mount(
      <div data-cy="first div">
        <Button
          text={buttonText}
          onClick={onClickSpy}
          icon={faPlus}
        />
      </div>,
    );
    cy.get('[data-cy="button-gtd"]').click();

    cy.get('[data-cy="button-text"]').should('have.text', buttonText);
    cy.get('@onClickSpy').should('be.called');
    cy.get('[data-cy="button-icon"]');
  });
});
