import { Routes, Route, useNavigate } from 'react-router-dom';
import TaskView from './views/tasks/Task';
import LoginView from './views/login/Login';
import RequireAuth from './components/auth/RequireAuth';
import ErrorView from './views/error/Error';
import { AppContext } from './contexts/appContext';
import { INDEX, OTHER, REPO_URL, TASK } from './constants/routePaths';
import { GREY } from './constants/colors';
import { styled } from 'styled-components';
import pjson from '../package.json';

const App = () => {
  const navigate = useNavigate();

  const defaultRouteMessage: string =
    'Ups looks like this page does not exist :(';

  const goToIndex = () => {
    navigate(INDEX);
  };

  return (
    <AppContext>
      <Container>
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
        <TagContainer>
          <VersionTag
            href={REPO_URL}
            target={'_blank'}
            data-cy="Version-Tag"
          >
            V {pjson.version}
          </VersionTag>
        </TagContainer>
      </Container>
    </AppContext>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 90vh;
`;

const TagContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: end;
`;

const VersionTag = styled.a`
  color: ${GREY};
`;

export default App;
