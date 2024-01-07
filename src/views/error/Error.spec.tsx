import React from 'react';
import { expect } from '@jest/globals';
import { render, act, screen } from '@testing-library/react';
import { AppContext } from '../../storybook/decorators/phone';
import ErrorView from './Error';

describe('Error View', () => {
  test('Should render an Error view ', async () => {
    const { container } = render(
      <AppContext>
        <ErrorView />
      </AppContext>,
    );
    expect(container).toMatchSnapshot();
  });
});
