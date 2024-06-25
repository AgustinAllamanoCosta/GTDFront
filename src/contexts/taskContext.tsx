import { createContext } from 'react';
import { Task, ActiveTasksWithTemp } from '../types/types';

export const TaskInformationContext = createContext<{
  getIsLoading: () => boolean;
  getActiveTaskToMap: () => ActiveTasksWithTemp;
  getCancelTaskToMap: () => Array<Task>;
  getDoneTaskToMap: () => Array<Task>;
  getInboxTaskToMap: () => Array<Task>;
  refreshData: () => void;
  addNewTask: (a: string, id: string, makeDaily: boolean) => string;
  cancelTask: (a: string) => void;
  activeTask: (a: string) => void;
  doneTask: (a: string) => void;
  getInboxTask: (a: string) => Task | undefined;
  setActiveItems: (a: any) => void;
  setInboxTask: (a: any) => void;
  setCancelItems: (a: any) => void;
  setDoneItems: (a: any) => void;
  clearCache: () => void;
  calculateTaskTemp: () => void;
}>({
  getIsLoading: () => true,
  getActiveTaskToMap: () => {
    return [];
  },
  getCancelTaskToMap: () => {
    return [];
  },
  getDoneTaskToMap: () => {
    return [];
  },
  getInboxTaskToMap: () => {
    return [];
  },
  refreshData: () => {},
  addNewTask: (a: string, id: string) => {
    return '';
  },
  getInboxTask: (a: string) => {
    return undefined;
  },
  cancelTask: (id: string) => {},
  activeTask: (id: string) => {},
  doneTask: (id: string) => {},
  setActiveItems: (a: any) => {},
  setInboxTask: (a: any) => {},
  setCancelItems: (a: any) => {},
  setDoneItems: (a: any) => {},
  clearCache: () => {},
  calculateTaskTemp: () => {},
});
