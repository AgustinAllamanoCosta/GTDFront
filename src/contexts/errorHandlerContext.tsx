import { createContext } from 'react';

export const ErrorHandlerContext = createContext<{
  anErrorHappened: boolean;
  error: any;
  setFlagError: (e: boolean) => void;
  setError: (e: any) => void;
}>({
  anErrorHappened: false,
  error: undefined,
  setFlagError: (e) => {},
  setError: (e) => {},
});
