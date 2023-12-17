import { GoogleOAuthProvider } from '@react-oauth/google';
import { styled } from 'styled-components';
import { Children } from 'react';

export const PhoneContext = (Story: any) => (
  <AppContext>
    <Story />
  </AppContext>
);

type AppContextProps = {
  children: string | JSX.Element | JSX.Element[];
};

export const AppContext = ({ children }: AppContextProps) => {
  const key: string = process.env.VITE_CLEINT_ID
    ? process.env.VITE_CLEINT_ID
    : '';
  return (
    <GoogleOAuthProvider clientId={key}>
      <MyPhoneContext>{children}</MyPhoneContext>
    </GoogleOAuthProvider>
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
