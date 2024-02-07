import { createContext } from 'react';

export const ErrorHandlerContext = createContext<{
  anErrorHappend: boolean;
  error: any;
  setFlagError: (e: boolean) => void;
  setError: (e: any) => void;
}>({
  anErrorHappend: false,
  error: undefined,
  setFlagError: (e) => {},
  setError: (e) => {},
});
