import React from 'react';
import { expect } from '@jest/globals';
import { render, act, screen } from '@testing-library/react';
import { AppContext } from '../../storybook/decorators/phone';
import MainView from './Main';

describe('Login View', () => {
  test('Should render a login view with singin and login buttons', async () => {
    const { container } = render(
      <AppContext>
        <MainView />
      </AppContext>,
    );
    expect(container).toMatchSnapshot();
  });
});
