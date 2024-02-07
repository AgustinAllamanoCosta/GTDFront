import { useState, ReactNode, useEffect, useMemo } from 'react';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import ErrorView from '../../views/error/Error';

const ErrorContext = ({ children }: { children: ReactNode }) => {
  const [anErrorHappend, setAnErrorHappend] = useState<boolean>(false);
  const [error, setError] = useState<any>(undefined);

  const errorHandlerContextValue = useMemo(
    () => ({
      anErrorHappend,
      error,
      setFlagError: setAnErrorHappend,
      setError,
    }),
    [anErrorHappend, error],
  );

  useEffect(() => {
    if (anErrorHappend) {
      console.group('Error handlers ');
      console.debug('ErrorMessage', error.message);
      console.debug('Error', error);
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
