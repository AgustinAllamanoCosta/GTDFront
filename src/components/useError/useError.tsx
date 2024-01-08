import { useState, ReactNode, useEffect } from 'react';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import { useNavigate } from 'react-router-dom';

const ErrorContext = ({ children }: { children: ReactNode }) => {
  const [anErrorHappend, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    if (anErrorHappend) {
      console.group('Error handlers ');
      console.error('An error happend', anErrorHappend);
      console.error('ErrorMessage', errorMessage);
      console.groupEnd();
      navigate('/error');
    }
  }, [anErrorHappend]);

  return (
    <ErrorHandlerContext.Provider
      value={{
        anErrorHappend,
        setError,
        setMessage: setErrorMessage,
      }}
    >
      {children}
    </ErrorHandlerContext.Provider>
  );
};

export default ErrorContext;
