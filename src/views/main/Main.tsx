import styled from 'styled-components';
import { UserCard } from '../../components/userCard/UserCard';
import { useState } from 'react';
import { ActiveTask } from '../../components/activeTask/ActiveTask';
import { ItemList } from '../../components/itemList/ItemList';
import { ActiveTasks, InboxTasks, UserData } from '../../types/types';
import { TaskInformationContext } from '../../contexts/taskContext';
import { useTask } from '../../hooks/useTask';

type MainViewProps = {
  userData?: UserData;
  activeTasks?: ActiveTasks;
  inboxTasks?: InboxTasks;
};

const MainView = ({
  userData = {
    name: 'default-user',
    photoURL: 'https://i.stack.imgur.com/Dj7eP.jpg',
  },
  inboxTasks = [],
}: MainViewProps) => {
  const [userConfig, setUserConfig] = useState(userData);
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
        <UserCard
          userName={userConfig.name}
          userPhoto={userConfig.photoURL}
        />
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

export default MainView;
