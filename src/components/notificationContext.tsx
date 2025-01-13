import { createContext } from 'react';

export const NotificationHandlerContext = createContext<{
  setNotification: (message: string) => void;
  closeNotification: () => void;
  showNotification: boolean;
  message: string | undefined;
}>({
  setNotification: () => {},
  closeNotification: () => {},
  showNotification: false,
  message: '',
});
