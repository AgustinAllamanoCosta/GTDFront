import { useState, useEffect, ReactNode, useContext } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { UserData } from '../../types/types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import { IS_END_TO_END } from '../../constants/environment';
import { useViewport } from '../../hooks/useView';

const UserContext = ({
  children,
  configuration,
}: {
  children: ReactNode;
  configuration: any;
}) => {
  const errorContext = useContext(ErrorHandlerContext);
  const { getUserData, saveUserData } = useLocalStorage();

  const [userData, setUserData] = useState<UserData>();
  const { isMobile } = useViewport();

  const saveUserDataInApp = (userData: UserData | undefined) => {
    saveUserData(userData);
    setUserData(userData);
  };

  useEffect(() => {
    try {
      if (configuration.environment === IS_END_TO_END) {
        const userData = {
          accessToken: configuration.accessToken,
          id: configuration.ID,
          name: configuration.name,
          photoURL: configuration.photoURL,
        };
        saveUserDataInApp(userData);
      } else {
        const localUserData: UserData | undefined = getUserData();
        if (localUserData) {
          setUserData(localUserData);
        }
      }
    } catch (error: any) {
      errorContext.setError(true);
      errorContext.setMessage(error.message);
    }
  }, []);

  return (
    <UserInformationContext.Provider
      value={{
        userData,
        isMobile,
        setUserData: saveUserDataInApp,
      }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

export default UserContext;
