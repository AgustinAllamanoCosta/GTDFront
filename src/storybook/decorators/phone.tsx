import { GoogleOAuthProvider } from "@react-oauth/google";
import { styled } from "styled-components";
import credentials from "../../assets/google/client_secret_153375467669-bl3575q27tmq97cf359v0unoegk06opn.apps.googleusercontent.com.json";
import { Children } from "react";

export const PhoneContext = (Story: any) => (
  <AppContext credential={credentials}>{Story}</AppContext>
);

type AppContextProps = {
  children: string | JSX.Element | JSX.Element[];
  credential: any;
};

export const AppContext = ({ credential, children }: AppContextProps) => {
  return (
    <GoogleOAuthProvider clientId={credential.web.client_id}>
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
