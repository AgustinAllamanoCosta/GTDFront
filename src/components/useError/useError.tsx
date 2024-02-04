import { useState, ReactNode, useEffect, useMemo } from 'react';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import ErrorView from '../../views/error/Error';

const ErrorContext = ({ children }: { children: ReactNode }) => {
  const [anErrorHappend, setAnErrorHappend] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const errorHandlerContextValue = useMemo(
    () => ({
      anErrorHappend,
      errorMessage,
      setError: setAnErrorHappend,
      setMessage: setErrorMessage,
    }),
    [anErrorHappend, errorMessage],
  );

  useEffect(() => {
    if (anErrorHappend) {
      console.group('Error handlers ');
      console.debug('ErrorMessage', errorMessage);
      console.groupEnd();
    }
  }, [anErrorHappend]);

  return (
    <ErrorHandlerContext.Provider value={errorHandlerContextValue}>
      {anErrorHappend ? (
        <ErrorView onClick={() => setAnErrorHappend(false)} />
      ) : (
        children
      )}
    </ErrorHandlerContext.Provider>
  );
};

export default ErrorContext;
