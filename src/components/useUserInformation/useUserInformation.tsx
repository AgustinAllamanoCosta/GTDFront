import { useState, useEffect, ReactNode, useContext } from 'react';
import { UserInformationContext } from '../../contexts/userContext';
import { UserData } from '../../types/types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';

const UserContext = ({ children }: { children: ReactNode }) => {
  const errorContext = useContext(ErrorHandlerContext);
  const { getUserData, saveUserData } = useLocalStorage();

  const [userData, setUserData] = useState<UserData>();

  const saveUserDataInApp = (userData: UserData | undefined) => {
    saveUserData(userData);
    setUserData(userData);
  };

  useEffect(() => {
    try {
      if (process.env.APP_ENV === 'E2E') {
        const userData = {
          accessToken: process.env.ACCESS_TOKEN ? process.env.ACCESS_TOKEN : '',
          id: process.env.ID ? process.env.ID : '',
          name: process.env.NAME ? process.env.NAME : '',
          photoURL: process.env.PHOTO_URL ? process.env.PHOTO_URL : '',
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
        setUserData: saveUserDataInApp,
      }}
    >
      {children}
    </UserInformationContext.Provider>
  );
};

export default UserContext;
