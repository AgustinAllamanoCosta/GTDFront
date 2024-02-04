import { Routes, Route, useNavigate } from 'react-router-dom';
import RequireAuth from './components/auth/RequireAuth';
import ErrorView from './views/error/Error';
import { AppContext } from './contexts/appContext';
import { INDEX, OTHER, TASK } from './constants/routePaths';
import { Suspense, lazy } from 'react';
import VersionNumberTag from './components/versionTag/VersionTag';
import { configuration } from './config/appConfig';

const TaskViewLazy = lazy(() => import('./views/tasks/Task'));
const LoginViewLazy = lazy(() => import('./views/login/Login'));

const App = () => {
  const navigate = useNavigate();

  const defaultRouteMessage: string =
    'Ups looks like this page does not exist :(';

  const goToIndex = () => {
    navigate(INDEX);
  };

  return (
    <>
      <AppContext>
        <Routes>
          <Route
            path={INDEX}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <LoginViewLazy />
              </Suspense>
            }
          />
          <Route
            path={TASK}
            element={
              <RequireAuth>
                <Suspense fallback={<div>Loading...</div>}>
                  <TaskViewLazy
                    refreshTaskInterval={configuration.refreshTimeOut}
                  />
                </Suspense>
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
      <VersionNumberTag />
    </>
  );
};

export default App;
