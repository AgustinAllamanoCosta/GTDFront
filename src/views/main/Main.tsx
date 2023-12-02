import styled from 'styled-components';
import { UserCard } from '../../components/userCard/UserCard';
import { useState } from 'react';
import { StickyNote } from '../../components/stickyNote/StickyNote';
import { CardTitle } from '../../components/cardWithTile/CardWithTitle';

type UserData = {
  name: string;
  photoURL: string;
};

type Task = {
  text: string;
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
  const [activeTasks, setActiveTasks] = useState(activeTask);
  const [tasks, setTasks] = useState(inboxTask);

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
          {activeTask[0] && <StickyNote text={activeTask[0].text} />}
          {activeTask[1] && <StickyNote text={activeTask[1].text} />}
          {activeTask[2] && <StickyNote text={activeTask[2].text} />}
        </ActiveTaskContainer>
      </CardTitle>

      <CardTitle title="Task Inbox"></CardTitle>
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
