import React from 'react';
import { expect } from '@jest/globals';
import { render, act, screen } from '@testing-library/react';
import LoginView from './Login';
import { AppContext } from '../../storybook/decorators/phone';

describe('Login View', () => {
  test('Should render a login view with singin and login buttons', async () => {
    const { container } = render(
      <AppContext>
        <LoginView />
      </AppContext>,
    );
    expect(container).toMatchSnapshot();
  });
});
