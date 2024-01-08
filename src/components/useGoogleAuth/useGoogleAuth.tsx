import { useState, useEffect, ReactNode, useContext } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';

const GoogleAuthContext = ({ children }: { children: ReactNode }) => {
  const errorContext = useContext(ErrorHandlerContext);
  const [googleKey, setGoogleKey] = useState<string>('');

  useEffect(() => {
    try {
      if (googleKey === '' && process.env.VITE_CLEINT_ID) {
        setGoogleKey(process.env.VITE_CLEINT_ID);
      }
    } catch (error: any) {
      errorContext.setError(true);
      errorContext.setMessage(error.message);
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={googleKey}>{children}</GoogleOAuthProvider>
  );
};

export default GoogleAuthContext;
