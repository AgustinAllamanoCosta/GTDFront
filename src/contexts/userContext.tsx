import { createContext } from 'react';
import { UserData } from '../types/types';

export const UserInformationContext = createContext<{
  userData: UserData | undefined;
  isMobile: boolean;
  setUserData: (e: UserData | undefined) => void;
}>({
  userData: undefined,
  isMobile: false,
  setUserData: (e: UserData | undefined) => {},
});
