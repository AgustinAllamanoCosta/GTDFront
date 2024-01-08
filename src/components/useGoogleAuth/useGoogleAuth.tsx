import { ReactNode } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { configuration } from '../../config/appConfig';
import ErrorView from '../../views/error/Error';

const GoogleAuthContext = ({ children }: { children: ReactNode }) => {
  return (
    <>
      {configuration.clientId ? (
        <GoogleOAuthProvider clientId={configuration.clientId}>
          {children}
        </GoogleOAuthProvider>
      ) : (
        <ErrorView
          onClick={() => {
            console.log('Faltal error!');
          }}
          message="Looks like a env variable is missing clientId"
        />
      )}
    </>
  );
};

export default GoogleAuthContext;
