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
import { useViewport } from '../../hooks/useView';

type TaskViewProps = {
  inboxTasks?: InboxTasks;
  userData?: UserData;
};

const TaskView = ({ inboxTasks = [], userData }: TaskViewProps) => {
  const errorContext = useContext(ErrorHandlerContext);
  const userInformation = useContext(UserInformationContext);
  const itemContext = useContext(TaskInformationContext);
  const navigate = useNavigate();
  const { isMobile } = useViewport();

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
      if (inboxTasks.length > 0) itemContext.setItems(inboxTasks);
    } catch (error: any) {
      errorContext.setError(true);
      errorContext.setMessage(error.message);
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
      <ContentContainer is_mobile={`${isMobile}`}>
        {isMobile && (
          <>
            <ActiveTask />
            <ItemList title="Inbox" />
          </>
        )}
        {!isMobile && (
          <>
            <ItemList title="Inbox" />
            <ActiveTask />
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
  justify-content: space-between;
  ${(props) =>
    props.is_mobile === 'true'
      ? `
  flex-direction: column;
  align-items: center;
  `
      : `
  width: 100vh;
  flex-direction: row;
  align-items: center;
  height: 820px;
  `};
`;

export default TaskView;
