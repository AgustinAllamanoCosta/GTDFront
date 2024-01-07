import styled from 'styled-components';
import { UserCard } from '../../components/userCard/UserCard';
import { useContext, useEffect } from 'react';
import { ActiveTask } from '../../components/activeTask/ActiveTask';
import { ItemList } from '../../components/itemList/ItemList';
import { InboxTasks, UserData } from '../../types/types';
import { UserInformationContext } from '../../contexts/userContext';
import { googleLogout } from '@react-oauth/google';
import { TaskInformationContext } from '../../contexts/taskContext';

type TaskViewProps = {
  inboxTasks?: InboxTasks;
  userData?: UserData;
};

const TaskView = ({ inboxTasks = [], userData }: TaskViewProps) => {
  const userInformation = useContext(UserInformationContext);
  const itemContext = useContext(TaskInformationContext);

  const logOut = () => {
    googleLogout();
    userInformation.setUserData(undefined);
  };

  useEffect(() => {
    if (userData) {
      userInformation.setUserData(userData);
    }
    if (inboxTasks.length > 0) itemContext.setItems(inboxTasks);
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
      <ActiveTask />
      <ItemList title="Task Inbox" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

export default TaskView;
