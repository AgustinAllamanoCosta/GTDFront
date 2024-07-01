import { Routes, Route, useNavigate } from 'react-router-dom';
import RequireAuth from './components/auth/RequireAuth';
import ErrorView from './views/error/Error';
import { INDEX, OTHER, TASK } from './constants/routePaths';
import { Suspense, lazy, useCallback } from 'react';
import VersionNumberTag from './components/versionTag/VersionTag';
import { configuration } from './config/appConfig';
import { Spiner } from './components/loadingSpiner/Spiner';
import styled from 'styled-components';

const TaskViewLazy = lazy(() => import('./views/tasks/Task'));
const LoginViewLazy = lazy(() => import('./views/login/Login'));
const AppContext = lazy(() => import('./contexts/appContext'));

const App = () => {
  const navigate = useNavigate();

  const defaultRouteMessage: string =
    'Ups looks like this page does not exist :(';

  const goToIndex = useCallback(() => {
    navigate(INDEX);
  }, []);

  return (
    <Suspense
      fallback={
        <SpinerContainer>
          <Spiner />
        </SpinerContainer>
      }
    >
      <AppContext>
        <Routes>
          <Route
            path={INDEX}
            element={
              <Suspense
                fallback={
                  <SpinerContainer>
                    <Spiner />
                  </SpinerContainer>
                }
              >
                <LoginViewLazy />
              </Suspense>
            }
          />
          <Route
            path={TASK}
            element={
              <RequireAuth>
                <Suspense
                  fallback={
                    <SpinerContainer>
                      <Spiner />
                    </SpinerContainer>
                  }
                >
                  <TaskViewLazy
                    refreshTaskInterval={configuration.refreshTimeOut}
                    calculateTaskTemp={configuration.calculateTaskTemp}
                    loadScheduleTask={configuration.loadScheduleTask}
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
    </Suspense>
  );
};

const SpinerContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default App;
