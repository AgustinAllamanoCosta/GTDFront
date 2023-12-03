import styled from 'styled-components';
import { UserCard } from '../../components/userCard/UserCard';
import { useState } from 'react';
import { StickyNote } from '../../components/stickyNote/StickyNote';
import { CardTitle } from '../../components/cardWithTile/CardWithTitle';
import { ItemList } from '../../components/itemList/ItemList';

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
  activeTask?: ActiveTask;
  inboxTask?: InboxTask;
};

const MainView = ({
  userData = {
    name: 'Agustin Allamano Costa',
    photoURL: 'https://i.stack.imgur.com/Dj7eP.jpg',
  },
  activeTask = [],
  inboxTask = [],
}: MainViewProps) => {
  const [userConfig, setUserConfig] = useState(userData);
  const [activeTasks, setActiveTasks] = useState<Array<Task>>(activeTask);
  const [tasks, setTasks] = useState<Array<Task>>(inboxTask);

  return (
    <Container>
      <UserCard
        userName={userConfig.name}
        userPhoto={userConfig.photoURL}
      />

      <CardTitle
        title="Active Task"
        label={`${activeTasks.length}/${tasks.length}`}
      >
        <ActiveTaskContainer>
          {activeTask[0] && <StickyNote text={activeTask[0].title} />}
          {activeTask[1] && <StickyNote text={activeTask[1].title} />}
          {activeTask[2] && <StickyNote text={activeTask[2].title} />}
        </ActiveTaskContainer>
      </CardTitle>

      <ItemList
        title="Task Inbox"
        items={tasks}
      ></ItemList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ActiveTaskContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export default MainView;
