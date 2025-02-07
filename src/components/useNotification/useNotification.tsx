import { useState, ReactNode, useMemo, useRef } from 'react';
import { NotificationHandlerContext } from '../notificationContext';

const NotificationContext = ({ children }: { children: ReactNode }) => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<
    string | undefined
  >(undefined);
  const timer = useRef<NodeJS.Timeout | undefined>(undefined);

  const setNotification = (message: string, autoClose?: boolean): void => {
    if (!notificationMessage) {
      setNotificationMessage(message);
      setShowNotification(true);
      if (autoClose) {
        timer.current = setTimeout(closeNotification, 2000);
      }
    } else {
      closeNotification();
      setNotification(message, autoClose);
    }
  };

  const closeNotification = (): void => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = undefined;
    setNotificationMessage(undefined);
    setShowNotification(false);
  };

  const useNotificationContextValue = useMemo(
    () => ({
      showNotification,
      closeNotification,
      setNotification,
      message: notificationMessage,
    }),
    [notificationMessage],
  );

  return (
    <NotificationHandlerContext.Provider value={useNotificationContextValue}>
      {children}
    </NotificationHandlerContext.Provider>
  );
};

export default NotificationContext;
