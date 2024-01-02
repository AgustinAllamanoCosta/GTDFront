import { GoogleOAuthProvider } from '@react-oauth/google';
import { useState } from 'react';
import { styled } from 'styled-components';
import { UserData } from '../../types/types';
import { UserInformationContext } from '../../contexts/userContext';
import { BrowserRouter } from 'react-router-dom';

export const PhoneContext = (Story: any) => (
  <AppContext>
    <Story />
  </AppContext>
);

type AppContextProps = {
  children: string | JSX.Element | JSX.Element[];
};

export const AppContext = ({ children }: AppContextProps) => {
  const [userData, setUserData] = useState<UserData>();
  const key: string = process.env.VITE_CLEINT_ID
    ? process.env.VITE_CLEINT_ID
    : '';

  return (
    <BrowserRouter>
      <UserInformationContext.Provider
        value={{
          userData,
          setUserData,
        }}
      >
        <GoogleOAuthProvider clientId={key}>
          <MyPhoneContext>{children}</MyPhoneContext>
        </GoogleOAuthProvider>
      </UserInformationContext.Provider>
    </BrowserRouter>
  );
};

const MyPhoneContext = styled.div`
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 390px;
  height: 884px;
`;
