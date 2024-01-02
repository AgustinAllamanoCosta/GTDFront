import styled from 'styled-components';
import { UserCard } from '../../components/userCard/UserCard';
import { useContext } from 'react';
import { ActiveTask } from '../../components/activeTask/ActiveTask';
import { ItemList } from '../../components/itemList/ItemList';
import { InboxTasks } from '../../types/types';
import { TaskInformationContext } from '../../contexts/taskContext';
import { useTask } from '../../hooks/useTask';
import { UserInformationContext } from '../../contexts/userContext';

type TaskViewProps = {
  inboxTasks?: InboxTasks;
};

const TaskView = ({ inboxTasks = [] }: TaskViewProps) => {
  const userInformation = useContext(UserInformationContext);
  const { activeItems, inboxTask, items, setActiveItems, setItems } =
    useTask(inboxTasks);

  return (
    <Container>
      <TaskInformationContext.Provider
        value={{
          activeTasks: activeItems,
          inboxTasks: inboxTask,
          items,
          setActiveTask: setActiveItems,
          setItems,
        }}
      >
        {userInformation.userData && (
          <UserCard
            userName={userInformation.userData.name}
            userPhoto={userInformation.userData.photoURL}
          />
        )}
        <ActiveTask />
        <ItemList title="Task Inbox" />
      </TaskInformationContext.Provider>
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
