import React from 'react';
import { expect } from '@jest/globals';
import { render } from '@testing-library/react';
import ErrorView from './Error';
import { BrowserRouter } from 'react-router-dom';

describe('Error View', () => {
  test('Should render an Error view ', async () => {
    const { container } = render(
      <BrowserRouter>
        <ErrorView
          onClick={() => {}}
          message="some error message"
        />
      </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
