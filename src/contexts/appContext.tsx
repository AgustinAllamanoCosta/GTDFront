import styled, { createGlobalStyle } from 'styled-components';
import ErrorContext from '../components/useError/useError';
import ItemsContext from '../components/useItems/useItems';
import MetricContext from '../components/useEvent/useEvent';
import UserContext from '../components/useUserInformation/useUserInformation';
import GoogleAuthContext from '../components/useGoogleAuth/useGoogleAuth';
import { configuration } from '../config/appConfig';
import { THEME_ONE } from '../constants/colors';
import InerFontBold from '../assets/fonts/Inter-Bold.ttf';
import InerFontNormal from '../assets/fonts/Inter-Regular.ttf';
import { firebaseData } from '../hooks/useFirebase';
import { AppContextProps } from '../types/types';

const AppContext = ({ children }: AppContextProps) => {
  return (
    <AppContainer>
      <MetricContext analytics={firebaseData.analytics}>
        <GlobalStyles />
        <ErrorContext>
          <UserContext configuration={configuration}>
            <ItemsContext>
              <GoogleAuthContext clientId={configuration.clientId}>
                {children}
              </GoogleAuthContext>
            </ItemsContext>
          </UserContext>
        </ErrorContext>
      </MetricContext>
    </AppContainer>
  );
};

const AppContainer = styled.div`
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

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
  background-color: ${THEME_ONE.background};
color: ${THEME_ONE.fontColor};
       font-family: 'Iner';
margin: 0px;
}
`;

export default AppContext;
