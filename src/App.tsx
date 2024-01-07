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
import { ErrorHandlerContext } from './contexts/errorHandlerContext';
import ErrorView from './views/error/Error';

const App = () => {
  const [userData, setUserData] = useState<UserData>();
  const [googleKey, setGoogleKey] = useState<string>('');
  const [anErrorHappend, setError] = useState<boolean>(false);
  const { getUserData, saveUserData } = useLocalStorage();

  useEffect(() => {
    const localUserData: UserData | undefined = getUserData();
    if (localUserData) {
      setUserData(localUserData);
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
      <UserInformationContext.Provider
        value={{
          userData,
          setUserData: (userData: UserData | undefined) => {
            saveUserData(userData);
            setUserData(userData);
          },
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
    </ErrorHandlerContext.Provider>
  );
};

const GlobalStyles = createGlobalStyle`
  body {
    background-color: black;
  }
`;

export default App;
