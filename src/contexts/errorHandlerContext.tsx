import { createContext } from 'react';

export const ErrorHandlerContext = createContext<{
  anErrorHappend: boolean;
  errorMessage:string;
  setError: (e: boolean) => void;
  setMessage: (e: string) => void;
}>({
  anErrorHappend: false,
  errorMessage: '',
  setError: (e) => {},
  setMessage: (e) => {},
});
