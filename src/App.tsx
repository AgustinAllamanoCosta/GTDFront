import { createGlobalStyle } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import TaskView from './views/tasks/Task';
import LoginView from './views/login/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserInformationContext } from './contexts/userContext';
import { useEffect, useState } from 'react';
import { UserData } from './types/types';
import RequireAuth from './components/auth/RequireAuth';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TaskInformationContext } from './contexts/taskContext';
import { ErrorHandlerContext } from './contexts/errorHandlerContext';
import ErrorView from './views/error/Error';
import { useTask } from './hooks/useTask';

const App = () => {
  const { getUserData, saveUserData } = useLocalStorage();
  const { activeItems, inboxTask, items, setActiveItems, setItems } = useTask();
  
  const [userData, setUserData] = useState<UserData>();
  const [googleKey, setGoogleKey] = useState<string>('');
  const [anErrorHappend, setError] = useState<boolean>(false);

  const saveUserDataInApp = (userData: UserData | undefined) => {
    saveUserData(userData);
    setUserData(userData);
  };

  useEffect(() => {
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
    if (googleKey === '' && process.env.VITE_CLEINT_ID) {
      setGoogleKey(process.env.VITE_CLEINT_ID);
    }
  }, []);

  return (
    <ErrorHandlerContext.Provider
      value={{
        anErrorHappend,
        setError,
      }}
    >
      <TaskInformationContext.Provider
        value={{
          activeTasks: activeItems,
          inboxTasks: inboxTask,
          items,
          setActiveTask: setActiveItems,
          setItems,
        }}
      >
        <UserInformationContext.Provider
          value={{
            userData,
            setUserData: saveUserDataInApp,
          }}
        >
          <GlobalStyles />
          {!anErrorHappend ? (
            <GoogleOAuthProvider clientId={googleKey}>
              <Routes>
                <Route
                  path="/"
                  element={<LoginView />}
                />
                <Route
                  path="/task"
                  element={
                    <RequireAuth>
                      <TaskView />
                    </RequireAuth>
                  }
                />
              </Routes>
            </GoogleOAuthProvider>
          ) : (
            <ErrorView />
          )}
        </UserInformationContext.Provider>
      </TaskInformationContext.Provider>
    </ErrorHandlerContext.Provider>
  );
};

const GlobalStyles = createGlobalStyle`
  body {
    background-color: black;
  }
`;

export default App;
