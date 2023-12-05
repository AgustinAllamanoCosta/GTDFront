import styled from 'styled-components';
import { UserCard } from '../../components/userCard/UserCard';
import { useState } from 'react';
import { ItemList } from '../../components/itemList/ItemList';
import { ActiveTask } from '../../components/activeTask/ActiveTask';

type UserData = {
  name: string;
  photoURL: string;
};

export type Task = {
  title: string;
  isComplete: boolean;
};

type ActiveTask = Array<Task>;
type InboxTask = Array<Task>;

type MainViewProps = {
  userData?: UserData;
  activeTasks?: ActiveTask;
  inboxTasks?: InboxTask;
};

const MainView = ({
  userData = {
    name: 'Agustin Allamano Costa',
    photoURL: 'https://i.stack.imgur.com/Dj7eP.jpg',
  },
  activeTasks = [
    { title: 'some task', isComplete: false },
    { title: 'some task', isComplete: false },
    { title: 'some task', isComplete: false },
  ],
  inboxTasks = [],
}: MainViewProps) => {
  const [userConfig, setUserConfig] = useState(userData);
  const [tasks, setTasks] = useState<Array<Task>>(inboxTasks);

  return (
    <Container>
      <UserCard
        userName={userConfig.name}
        userPhoto={userConfig.photoURL}
      />
      <ActiveTask task_list={activeTasks} />
      <ItemList
        title="Task Inbox"
        items={tasks}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 90%;
`;

export default MainView;
