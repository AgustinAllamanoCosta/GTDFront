import { Routes, Route, useNavigate } from 'react-router-dom';
import TaskView from './views/tasks/Task';
import LoginView from './views/login/Login';
import RequireAuth from './components/auth/RequireAuth';
import ErrorView from './views/error/Error';
import { AppContext } from './contexts/appContext';
import { INDEX, OTHER, TASK } from './constants /routePaths';

const App = () => {
  const navigate = useNavigate();

  const defaultRouteMessage: string =
    'Ups looks like this page does not exist :(';

  const goToIndex = () => {
    navigate(INDEX);
  };

  return (
    <AppContext>
      <Routes>
        <Route
          path={INDEX}
          element={<LoginView />}
        />
        <Route
          path={TASK}
          element={
            <RequireAuth>
              <TaskView />
            </RequireAuth>
          }
        />
        <Route
          path={OTHER}
          element={
            <ErrorView
              onClick={goToIndex}
              message={defaultRouteMessage}
            />
          }
        />
      </Routes>
    </AppContext>
  );
};

export default App;
