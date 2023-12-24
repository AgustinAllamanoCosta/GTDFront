import styled from 'styled-components';
import { UserCard } from '../../components/userCard/UserCard';
import { useEffect, useState } from 'react';
import { ActiveTask } from '../../components/activeTask/ActiveTask';
import { createContext } from 'react';
import { ItemList } from '../../components/itemList/ItemList';

type UserData = {
  name: string;
  photoURL: string;
};

export type Task = {
  id: string;
  title: string;
  isComplete: boolean;
  isCancele: boolean;
  isActive: boolean;
};

export type ActiveTasks = Array<Task>;
export type InboxTasks = Array<Task>;
export type Tasks = Array<Task>;

type MainViewProps = {
  userData?: UserData;
  activeTasks?: ActiveTasks;
  inboxTasks?: InboxTasks;
};

export const TaskInformationContext = createContext<{
  activeTasks: ActiveTasks;
  inboxTasks: InboxTasks;
  items: Tasks;
  setActiveTask: (e: ActiveTasks) => void;
  setItems: (e: Tasks) => void;
}>({
  activeTasks: [],
  inboxTasks: [],
  items: [],
  setActiveTask: (e) => {},
  setItems: (e) => {},
});

const MainView = ({
  userData = {
    name: '',
    photoURL: 'https://i.stack.imgur.com/Dj7eP.jpg',
  },
  inboxTasks = [],
}: MainViewProps) => {
  const [userConfig, setUserConfig] = useState(userData);

  const [activeItems, setActiveItems] = useState<ActiveTasks>([]);
  const [inboxTask, setInboxTask] = useState<InboxTasks>([]);

  const [items, setItems] = useState<InboxTasks>(inboxTasks);

  const getTheActiveTask = (taskToAnalize: InboxTasks) => {
    const newActiveTask: Array<Task> = taskToAnalize.filter((task: Task) => {
      return task.isActive && !task.isCancele && !task.isComplete;
    });
    setActiveItems([...newActiveTask]);
  };

  const getInboxTask = (taskToAnalize: InboxTasks) => {
    const newInboxTask: Array<Task> = taskToAnalize.filter((task: Task) => {
      return !task.isActive && !task.isCancele && !task.isComplete;
    });
    setInboxTask([...newInboxTask]);
  };

  useEffect(() => {
    getTheActiveTask(items);
    getInboxTask(items);
  }, [items]);

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
