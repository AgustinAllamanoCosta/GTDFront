import { createContext } from 'react';

export const NotificationHandlerContext = createContext<{
  setNotification: (message: string, autoClose?: boolean) => void;
  closeNotification: () => void;
  showNotification: boolean;
  message: string | undefined;
}>({
  setNotification: () => {},
  closeNotification: () => {},
  showNotification: false,
  message: '',
});
