import { createGlobalStyle } from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import TaskView from './views/tasks/Task';
import LoginView from './views/login/Login';
import RequireAuth from './components/auth/RequireAuth';
import ErrorView from './views/error/Error';
import ErrorContext from './components/useError/useError';
import ItemsContext from './components/useItems/useItems';
import UserContext from './components/useUserInformation/useUserInformation';
import GoogleAuthContext from './components/useGoogleAuth/useGoogleAuth';

const App = () => {
  return (
    <ErrorContext>
      <ItemsContext>
        <UserContext>
          <GoogleAuthContext>
            <GlobalStyles />
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
              <Route
                path="/error"
                element={<ErrorView />}
              />
            </Routes>
          </GoogleAuthContext>
        </UserContext>
      </ItemsContext>
    </ErrorContext>
  );
};

const GlobalStyles = createGlobalStyle`
  body {
    background-color: black;
  }
`;

export default App;
