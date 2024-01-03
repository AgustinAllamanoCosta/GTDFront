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

const App = () => {
  const [userData, setUserData] = useState<UserData>();
  const { getUserData, saveUserData } = useLocalStorage();
  const key: string = process.env.VITE_CLEINT_ID
    ? process.env.VITE_CLEINT_ID
    : '';

  useEffect(() => {
    const localUserData: UserData | undefined = getUserData();
    if (localUserData) {
      setUserData(localUserData);
    }
  }, []);

  return (
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
      <GoogleOAuthProvider clientId={key}>
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
    </UserInformationContext.Provider>
  );
};

const GlobalStyles = createGlobalStyle`
  body {
    background-color: black;
  }
`;

export default App;
