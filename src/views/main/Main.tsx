import styled from "styled-components";
import { UserCard } from "../../components/userCard/UserCard";
import { useEffect, useState } from "react";
import { ItemList } from "../../components/itemList/ItemList";
import { ActiveTask } from "../../components/activeTask/ActiveTask";
import { createContext } from "react";

type UserData = {
  name: string;
  photoURL: string;
};

export type Task = {
  title: string;
  isComplete: boolean;
};

export type ActiveTask = Array<Task>;
export type InboxTask = Array<Task>;

type MainViewProps = {
  userData?: UserData;
  activeTasks?: ActiveTask;
  inboxTasks?: InboxTask;
};

export const TaskInformationContext = createContext<{
  activeTasks: ActiveTask;
  inboxTasks: InboxTask;
  setActiveTask: (e:any)=>void;
  setInboxTasks: (e:any)=>void;
}>({
  activeTasks: [],
  inboxTasks: [],
  setActiveTask: (e)=>{},
  setInboxTasks: (e)=>{},
});

const MainView = ({
  userData = {
    name: "",
    photoURL: "https://i.stack.imgur.com/Dj7eP.jpg",
  },
  activeTasks = [],
  inboxTasks = [],
}: MainViewProps) => {
  const [userConfig, setUserConfig] = useState(userData);
  const [activeItems, setActiveItems] = useState<ActiveTask>(activeTasks);
  const [items, setItems] = useState<InboxTask>(inboxTasks);

  const getTheActiveTask = () => {
    if (inboxTasks.length >= 3) {
      const newActiveTask: Array<Task> = inboxTasks.splice(0, 3);
      activeTasks = newActiveTask;
      setActiveItems([...newActiveTask])
    }else if (inboxTasks.length > 0){
      const newActiveTask: Array<Task> = inboxTasks.splice(0, inboxTasks.length);
      activeTasks = newActiveTask;
      setActiveItems([...newActiveTask])
    }
  };

  useEffect(() => {
    if (activeItems.length == 0) getTheActiveTask();
  }, [activeItems, items]);

  return (
    <Container>
      <TaskInformationContext.Provider
        value={{
          activeTasks: activeItems,
          inboxTasks: items,
          setActiveTask: setActiveItems,
          setInboxTasks: setItems
        }}
      >
        <UserCard userName={userConfig.name} userPhoto={userConfig.photoURL} />
        <ActiveTask/>
        <ItemList title="Task Inbox"/>
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
