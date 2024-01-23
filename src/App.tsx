import { Routes, Route, useNavigate } from 'react-router-dom';
import RequireAuth from './components/auth/RequireAuth';
import ErrorView from './views/error/Error';
import { AppContext } from './contexts/appContext';
import { INDEX, OTHER, REPO_URL, TASK } from './constants/routePaths';
import { GREY } from './constants/colors';
import { styled } from 'styled-components';
import pjson from '../package.json';
import { Suspense, lazy } from 'react';

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
                <TaskViewLazy />
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
      <TagContainer>
        <VersionTag
          href={REPO_URL}
          target={'_blank'}
          data-cy="Version-Tag"
        >
          V {pjson.version}
        </VersionTag>
      </TagContainer>
    </AppContext>
  );
};

const TagContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const VersionTag = styled.a`
  color: ${GREY};
  font-family: 'InerNormal' !important;
`;

export default App;
