import { useState, ReactNode, useEffect, useMemo } from 'react';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import ErrorView from '../../views/error/Error';

const ErrorContext = ({ children }: { children: ReactNode }) => {
  const [anErrorHappened, setAnErrorHappened] = useState<boolean>(false);
  const [error, setError] = useState<any>(undefined);

  const errorHandlerContextValue = useMemo(
    () => ({
      anErrorHappened,
      error,
      setFlagError: setAnErrorHappened,
      setError,
    }),
    [anErrorHappened, error],
  );

  useEffect(() => {
    if (anErrorHappened) {
      console.group('Error handlers ');
      console.debug('ErrorMessage', error.message);
      console.debug('Error', error);
      console.groupEnd();
    }
  }, [anErrorHappened]);

  return (
    <ErrorHandlerContext.Provider value={errorHandlerContextValue}>
      {anErrorHappened ? (
        <ErrorView onClick={() => setAnErrorHappened(false)} />
      ) : (
        children
      )}
    </ErrorHandlerContext.Provider>
  );
};

export default ErrorContext;
