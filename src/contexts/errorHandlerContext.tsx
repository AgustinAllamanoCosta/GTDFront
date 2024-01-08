import { createContext } from 'react';

export const ErrorHandlerContext = createContext<{
  anErrorHappend: boolean;
  setError: (e: boolean) => void;
  setMessage: (e: string) => void;
}>({
  anErrorHappend: false,
  setError: (e) => {},
  setMessage: (e) => {},
});
