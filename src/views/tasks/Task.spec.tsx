import React from 'react';
import { expect } from '@jest/globals';
import { render } from '@testing-library/react';
import TaskView from './Task';
import { BrowserRouter } from 'react-router-dom';

describe('Task View', () => {
  test('Should render a login view with singin and login buttons', async () => {
    const { container } = render(
      <BrowserRouter>
        <TaskView />
      </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
