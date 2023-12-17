import { useState } from 'react';
import {
  ActiveTask,
  InboxTask,
  Task,
  TaskInformationContext,
} from '../../views/main/Main';

const task1: Task = {
  title: 'some task 1',
  isComplete: false,
};
const task2: Task = {
  title: 'some task 2',
  isComplete: false,
};
const task3: Task = {
  title: 'some task 3',
  isComplete: false,
};

type TaskContextProps = {
  children: string | JSX.Element | JSX.Element[];
};

export const mockTaskInContext = [task1, task2, task3];

export const TaskContextDecorator = (Story: any) => {
  return (
    <TaskContext>
      <Story />
    </TaskContext>
  );
};

export const TaskContext = ({ children }: TaskContextProps) => {
  const [activeItems, setActiveItems] = useState<ActiveTask>(mockTaskInContext);
  const [items, setItems] = useState<InboxTask>(mockTaskInContext);

  return (
    <TaskInformationContext.Provider
      value={{
        activeTasks: activeItems,
        inboxTasks: items,
        setActiveTask: setActiveItems,
        setInboxTasks: setItems,
      }}
    >
      {children}
    </TaskInformationContext.Provider>
  );
};
