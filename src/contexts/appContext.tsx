import { createGlobalStyle } from 'styled-components';
import { ReactNode } from 'react';
import ErrorContext from '../components/useError/useError';
import ItemsContext from '../components/useItems/useItems';
import UserContext from '../components/useUserInformation/useUserInformation';
import GoogleAuthContext from '../components/useGoogleAuth/useGoogleAuth';
import { BLACK } from '../constants/colors';

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
            <GoogleAuthContext>{children}</GoogleAuthContext>
          </ItemsContext>
        </UserContext>
      </ErrorContext>
    </>
  );
};

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${BLACK};
    height: 100%;
  }
`;
