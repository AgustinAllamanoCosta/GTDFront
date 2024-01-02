import React from 'react';
import { expect } from '@jest/globals';
import { render, act, screen } from '@testing-library/react';
import { AppContext } from '../../storybook/decorators/phone';
import TaskView from './Task';

describe('Task View', () => {
  test('Should render a login view with singin and login buttons', async () => {
    const { container } = render(
      <AppContext>
        <TaskView />
      </AppContext>,
    );
    expect(container).toMatchSnapshot();
  });
});
