import styled from 'styled-components';
import { UserCard } from '../../components/userCard/UserCard';
import { useContext, useEffect } from 'react';
import { ActiveTask } from '../../components/activeTask/ActiveTask';
import { ItemList } from '../../components/itemList/ItemList';
import { InboxTasks, UserData } from '../../types/types';
import { UserInformationContext } from '../../contexts/userContext';
import { googleLogout } from '@react-oauth/google';
import { TaskInformationContext } from '../../contexts/taskContext';
import { ErrorHandlerContext } from '../../contexts/errorHandlerContext';
import { useNavigate } from 'react-router-dom';
import { CancelList } from '../../components/cancelList/CancelList';
import { DoneList } from '../../components/doneList/DoneList';
import { Carrusel } from '../../components/carrusel/Carrusel';

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

  const logOut = () => {
    googleLogout();
    userInformation.setUserData(undefined);
    navigate('/');
  };

  useEffect(() => {
    try {
      if (userData) {
        userInformation.setUserData(userData);
      }
      if (inboxTasks) {
        itemContext.setInboxTask(inboxTasks);
      } else {
        itemContext.refreshData();
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
              <ItemList />
              <DoneList />
              <CancelList />
            </Carrusel>
          </>
        )}
        {!userInformation.isMobile && (
          <>
            <CancelList />
            <ItemList />
            <ActiveTask />
            <DoneList />
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
