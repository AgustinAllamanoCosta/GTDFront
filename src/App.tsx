import { createGlobalStyle } from 'styled-components';
import { Routes, Route, useNavigate } from 'react-router-dom';
import TaskView from './views/tasks/Task';
import LoginView from './views/login/Login';
import RequireAuth from './components/auth/RequireAuth';
import ErrorContext from './components/useError/useError';
import ItemsContext from './components/useItems/useItems';
import UserContext from './components/useUserInformation/useUserInformation';
import GoogleAuthContext from './components/useGoogleAuth/useGoogleAuth';
import ErrorView from './views/error/Error';

const App = () => {
  const navigate = useNavigate();

  const defaultRouteMessage: string =
    'Ups looks like this page does not exist :(';

  const goToIndex = () => {
    navigate('/');
  };

  return (
    <>
      <GlobalStyles />
      <ErrorContext>
        <ItemsContext>
          <UserContext>
            <GoogleAuthContext>
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
                  path="*"
                  element={
                    <ErrorView
                      onClick={goToIndex}
                      message={defaultRouteMessage}
                    />
                  }
                />
              </Routes>
            </GoogleAuthContext>
          </UserContext>
        </ItemsContext>
      </ErrorContext>
    </>
  );
};

const GlobalStyles = createGlobalStyle`
  body {
    background-color: black;
  }
`;

export default App;
