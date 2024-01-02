import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import TaskView from './views/tasks/Task';
import LoginView from './views/login/Login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserInformationContext } from './contexts/userContext';
import { useState } from 'react';
import { UserData } from './types/types';
import RequireAuth from './components/auth/RequireAuth';

function App() {
  const [userData, setUserData] = useState<UserData>();
  const key: string = process.env.VITE_CLEINT_ID
    ? process.env.VITE_CLEINT_ID
    : '';

  return (
    <MainContainer>
      <UserInformationContext.Provider
        value={{
          userData,
          setUserData,
        }}
      >
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
    </MainContainer>
  );
}

export default App;

const MainContainer = styled.div`
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 884px;
`;
