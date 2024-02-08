import styled from 'styled-components';
import { UserCard } from '../../components/userCard/UserCard';
import { Suspense, useCallback, useContext, useEffect, lazy } from 'react';
import { InboxTasks, UserData } from '../../types/types';
import { UserInformationContext } from '../../contexts/userContext';
import { googleLogout } from '@react-oauth/google';
import { TaskInformationContext } from '../../contexts/taskContext';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import { useNavigate } from 'react-router-dom';
import { Carrusel } from '../../components/carrusel/Carrusel';

const ActiveTask = lazy(() => import('../../components/activeTask/ActiveTask'));
const ItemList = lazy(() => import('../../components/itemList/ItemList'));
const CancelList = lazy(() => import('../../components/cancelList/CancelList'));
const DoneList = lazy(() => import('../../components/doneList/DoneList'));

type TaskViewProps = {
  inboxTasks?: InboxTasks;
  userData?: UserData;
  refreshTaskInterval?: number;
};

const TaskView = ({
  inboxTasks = undefined,
  userData,
  refreshTaskInterval,
}: TaskViewProps) => {
  const errorContext = useContext(ErrorHandlerContext);
  const userInformation = useContext(UserInformationContext);
  const itemContext = useContext(TaskInformationContext);
  const navigate = useNavigate();

  const logOut = useCallback(() => {
    googleLogout();
    userInformation.setUserData(undefined);
    navigate('/');
  }, [userInformation.userData]);

  useEffect(() => {
    try {
      if (userData) {
        userInformation.setUserData(userData);
      }
      if (inboxTasks) {
        itemContext.setInboxTask(inboxTasks);
      }
      if (refreshTaskInterval) {
        const interval = setInterval(() => {
          itemContext.refreshData();
        }, refreshTaskInterval);
        return () => clearInterval(interval);
      }
    } catch (error: any) {
      errorContext.setFlagError(true);
      errorContext.setError(error.message);
    }
  }, []);

  return (
    <Container>
      {userInformation.userData && (
        <UserCard
          userName={userInformation.userData.name}
          userPhoto={userInformation.userData.photoURL}
          logout={logOut}
        />
      )}
      <ContentContainer is_mobile={`${userInformation.isMobile}`}>
        {userInformation.isMobile && (
          <>
            <ActiveTask />
            <Carrusel>
              <Suspense fallback={<div>Loading...</div>}>
                <ItemList />
              </Suspense>
              <Suspense fallback={<div>Loading...</div>}>
                <DoneList />
              </Suspense>
              <Suspense fallback={<div>Loading...</div>}>
                <CancelList />
              </Suspense>
            </Carrusel>
          </>
        )}
        {!userInformation.isMobile && (
          <>
            <Suspense fallback={<div>Loading...</div>}>
              <CancelList />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <ItemList />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <ActiveTask />
            </Suspense>
            <Suspense fallback={<div>Loading...</div>}>
              <DoneList />
            </Suspense>
          </>
        )}
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
`;

const ContentContainer = styled.div<{ is_mobile?: string }>`
  display: flex;
  ${(props) =>
    props.is_mobile === 'true'
      ? `
  flex-direction: column;
  align-items: center;
  `
      : `
  justify-content: space-between;
  width: 150vh;
  flex-direction: row;
  align-items: center;
  height: 820px;
  `};
`;

export default TaskView;
