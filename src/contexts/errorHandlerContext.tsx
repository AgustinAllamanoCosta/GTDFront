import { createContext } from 'react';

export const ErrorHandlerContext = createContext<{
  anErrorHappend: boolean;
  setError: (e: boolean) => void;
}>({
  anErrorHappend: false,
  setError: (e) => {},
});
