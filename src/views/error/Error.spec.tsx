import React from 'react';
import { expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { AppContext } from '../../storybook/decorators/phone';
import ErrorView from './Error';

describe('Error View', () => {
  test('Should render an Error view ', async () => {
    const { container } = render(
      <AppContext>
        <ErrorView
          onClick={() => {}}
          message="some error message"
        />
      </AppContext>,
    );
    expect(container).toMatchSnapshot();
  });
});
