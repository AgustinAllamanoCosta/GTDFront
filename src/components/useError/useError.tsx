import { useState, ReactNode, useEffect } from 'react';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import ErrorView from '../../views/error/Error';

const ErrorContext = ({ children }: { children: ReactNode }) => {
  const [anErrorHappend, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (anErrorHappend) {
      console.group('Error handlers ');
      console.debug('ErrorMessage', errorMessage);
      console.groupEnd();
    }
  }, [anErrorHappend]);

  return (
    <ErrorHandlerContext.Provider
      value={{
        anErrorHappend,
        errorMessage,
        setError,
        setMessage: setErrorMessage,
      }}
    >
      {anErrorHappend ? (
        <ErrorView onClick={() => setError(false)} />
      ) : (
        children
      )}
    </ErrorHandlerContext.Provider>
  );
};

export default ErrorContext;
