import { useState } from 'react';
import {
  ActiveTasks,
  InboxTasks,
  Task,
  TaskInformationContext,
} from '../../views/main/Main';
import { v4 as uuidv4 } from 'uuid';

const task1: Task = {
  title: 'some task 1',
  isComplete: false,
  id: uuidv4(),
  isCancele: false,
  isActive: false,
};
const task2: Task = {
  title: 'some task 2',
  isComplete: false,
  id: uuidv4(),
  isCancele: false,
  isActive: false,
};
const task3: Task = {
  title: 'some task 3',
  isComplete: false,
  id: uuidv4(),
  isCancele: false,
  isActive: false,
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
  const [activeItems, setActiveItems] = useState<ActiveTasks>([]);
  const [inboxTask, setInboxTask] = useState<InboxTasks>([]);

  const [items, setItems] = useState<InboxTasks>(mockTaskInContext);

  return (
    <TaskInformationContext.Provider
      value={{
        activeTasks: activeItems,
        inboxTasks: inboxTask,
        items,
        setActiveTask: setActiveItems,
        setItems,
      }}
    >
      {children}
    </TaskInformationContext.Provider>
  );
};
