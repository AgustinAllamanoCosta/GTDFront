import { createGlobalStyle } from 'styled-components';
import { ReactNode } from 'react';
import ErrorContext from '../components/useError/useError';
import ItemsContext from '../components/useItems/useItems';
import UserContext from '../components/useUserInformation/useUserInformation';
import GoogleAuthContext from '../components/useGoogleAuth/useGoogleAuth';
import { configuration } from '../config/appConfig';
import { BLACK } from '../constants/colors';
import InerFontBold from '../assets/fonts/Inter-Bold.ttf';
import InerFontNormal from '../assets/fonts/Inter-Regular.ttf';

type AppContextProps = {
  children: ReactNode;
};

export const AppContext = ({ children }: AppContextProps) => {
  return (
    <>
      <GlobalStyles />
      <ErrorContext>
        <UserContext>
          <ItemsContext>
            <GoogleAuthContext clientId={configuration.clientId}>
              {children}
            </GoogleAuthContext>
          </ItemsContext>
        </UserContext>
      </ErrorContext>
    </>
  );
};

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Iner';
    font-weight: 16;
    font-style: normal;
    font-display: swap;
    src: url(${InerFontBold}) format('truetype');
    font-style: normal;
  }

  @font-face {
    font-family: 'InerNormal';
    font-weight: lighter;
    font-style: normal;
    font-display: swap;
    src: url(${InerFontNormal}) format('truetype');
    font-style: normal;
  }
  body {
    background-color: ${BLACK};
    height: 100%;
    font-family: 'Iner';
  }
`;
