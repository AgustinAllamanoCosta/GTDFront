import { useState, useEffect, ReactNode, useContext, useMemo } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { Configuration, UserData } from '../../types/types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import { IS_END_TO_END, IS_LOCAL_TESTING } from '../../constants/environment';
import { useViewport } from '../../hooks/useView';

const UserContext = ({
  children,
  configuration,
}: {
  children: ReactNode;
  configuration: Configuration;
}) => {
  const errorContext = useContext(ErrorHandlerContext);
  const { getUserData, saveUserData } = useLocalStorage();

  const [userData, setUserData] = useState<UserData>();
  const { isMobile } = useViewport();

  const saveUserDataInApp = (userData: UserData | undefined) => {
    saveUserData(userData);
    setUserData(userData);
  };

  const userInformationContextValue = useMemo(
    () => ({
      userData,
      isMobile,
      setUserData: saveUserDataInApp,
    }),
    [userData, isMobile],
  );

  useEffect(() => {
    try {
      if (
        configuration.environment === IS_END_TO_END ||
        configuration.environment === IS_LOCAL_TESTING
      ) {
        console.log('Used mock user data');
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
      errorContext.setFlagError(true);
      errorContext.setError(error);
    }
  }, []);

  return (
    <UserInformationContext.Provider value={userInformationContextValue}>
      {children}
    </UserInformationContext.Provider>
  );
};

export default UserContext;
