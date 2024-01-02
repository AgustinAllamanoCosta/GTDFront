import { createContext } from 'react';
import { UserData } from '../types/types';

export const UserInformationContext = createContext<{
  userData: UserData | undefined;
  setUserData: (e: UserData | undefined) => void;
}>({
  userData: undefined,
  setUserData: (e: UserData | undefined) => {},
});
