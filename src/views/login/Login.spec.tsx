import React from 'react';
import { expect } from '@jest/globals';
import { render } from '@testing-library/react';
import LoginView from './Login';
import GoogleAuthContext from '../../components/useGoogleAuth/useGoogleAuth';
import { BrowserRouter } from 'react-router-dom';
import { configuration } from '../../config/appConfig';
import { IS_LOCAL_TESTING } from '../../constants/environment';

describe('Login View', () => {
  test('Should render a login view with singin and login buttons', async () => {
    const { container } = render(
      <BrowserRouter>
        <GoogleAuthContext clientId="CLIENT-ID">
          <LoginView environment={IS_LOCAL_TESTING} />
        </GoogleAuthContext>
      </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
