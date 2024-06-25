import styled from 'styled-components';
import { UserCard } from '../../components/userCard/UserCard';
import { Suspense, useCallback, useContext, useEffect, lazy } from 'react';
import { InboxTasks, UserData } from '../../types/types';
import { UserInformationContext } from '../../contexts/userContext';
import { googleLogout } from '@react-oauth/google';
import { TaskInformationContext } from '../../contexts/taskContext';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import { useNavigate } from 'react-router-dom';
import { Carousel } from '../../components/carousel/Carousel';
import { Spiner } from '../../components/loadingSpiner/Spiner';
import { useInterval } from '../../hooks/useInterval';

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
    itemContext.clearCache();
    navigate('/');
  }, [userInformation.userData]);

  if (refreshTaskInterval) {
    useInterval(itemContext.refreshData, refreshTaskInterval);
  }
  useInterval(itemContext.calculateTaskTemp, 1000 * 60 * 60);

  useEffect(() => {
    try {
      itemContext.refreshData();
      if (userData) {
        userInformation.setUserData(userData);
      }
      if (inboxTasks) {
        itemContext.setInboxTask(inboxTasks);
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
        {userInformation.isMobile ? (
          <>
            <ActiveTask />
            <Carousel>
              <Suspense fallback={<Spiner />}>
                <ItemList id={'item-0'} />
              </Suspense>
              <Suspense fallback={<Spiner />}>
                <DoneList id={'item-1'} />
              </Suspense>
              <Suspense fallback={<Spiner />}>
                <CancelList id={'item-2'} />
              </Suspense>
            </Carousel>
          </>
        ) : (
          <>
            <Suspense fallback={<Spiner />}>
              <CancelList />
            </Suspense>
            <Suspense fallback={<Spiner />}>
              <ItemList />
            </Suspense>
            <Suspense fallback={<Spiner />}>
              <ActiveTask />
            </Suspense>
            <Suspense fallback={<Spiner />}>
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
  height: 100%;
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
  justify-content: space-evenly;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 820px;
  flex-wrap: nowrap;
  `};
`;

export default TaskView;
