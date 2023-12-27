import { createContext } from 'react';
import { ActiveTasks, InboxTasks, Tasks } from '../types/types';

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
