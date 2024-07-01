import { Firestore } from 'firebase/firestore';

export type UserData = {
  id: string | undefined;
  name: string;
  photoURL: string;
  accessToken: string;
};

export type Task = {
  id: string;
  title: string;
  creationDate: string;
  backgroundColor: string;
  activationDate?: string;
  repiteTask?: boolean;
  points?: number;
  parentTask?: string;
  childTask?: {
    taskOne: string;
    taskTwo: string;
  };
};

export type ItemProps = {
  title: string;
  onCancel: () => void;
  onActive: () => void;
  onSplit: (taskOne: string, taskTwo: string) => void;
};

export type ItemSplitProps = {
  taskToSplit: string;
  onCancel: () => void;
  onSplit: (taskOne: string, taskTwo: string) => void;
};

export type ActiveTasks = Map<string, Task>;
export type CancelTasks = Map<string, Task>;
export type DoneTasks = Map<string, Task>;
export type InboxTasks = Map<string, Task>;

export type UserTaskData = {
  activeItems: ActiveTasks;
  cancelItems: CancelTasks;
  doneItems: DoneTasks;
  inboxItems: InboxTasks;
  scheduleTask: InboxTasks;
};

export type Configuration = {
  clientId: string | undefined;
  environment: string;
  accessToken: string;
  id: string;
  name: string;
  photoURL: string;
  ID: string;
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
  refreshTimeOut: number | undefined;
  loadScheduleTask: number | undefined;
  calculateTaskTemp: number | undefined;
  backendURL: string;
};

export type RepositoryFunctions = {
  save: (items: UserTaskData) => Promise<void>;
  getData: () => Promise<UserTaskData>;
  clear: () => Promise<void>;
};

export interface Repository {
  (userId: string, useFireBase: Firestore): RepositoryFunctions;
}

export interface LoadScheduleTask {
  (
    scheduleItems: Map<string, Task>,
    inboxItems: Map<string, Task>,
  ): Map<string, Task>;
}

export interface LoadScheduleItems {
  (): void;
}

export interface GenerateActiveItemsWithTemp {
  (activeItems: Map<string, Task>): ActiveTasks;
}

export interface MergeMaps {
  (
    newMap: Map<string, Task> | undefined,
    oldMap: Map<string, Task>,
  ): Map<string, Task>;
}

export interface ProcessMap {
  (mapToProcess: Map<string, Task>): Array<Task>;
}

export interface OrderItems {
  (items: Array<Task>): Array<Task>;
}

export interface CalculateBackgroundColor {
  (task: Task): string;
}

export interface ItemUtil {
  (): {
    loadScheduleTask: LoadScheduleTask;
    orderItems: OrderItems;
    processMap: ProcessMap;
    mergeMaps: MergeMaps;
    generateActiveItemsWithTemp: GenerateActiveItemsWithTemp;
    calculateBackgroundColor: CalculateBackgroundColor;
  };
}

export interface GetItems {
  (): Array<Task>;
}

export type UseTaskResponse = {
  getIsLoading: () => boolean;
  getDoneTaskToMap: GetItems;
  getCancelTaskToMap: GetItems;
  getActiveTaskToMap: GetItems;
  getInboxTaskToMap: GetItems;
  getInboxTask: (taskId: string) => Task | undefined;
  addNewTask: AddNewTask;
  cancelTask: CancelTask;
  activeTask: ActiveTask;
  doneTask: DoneTask;
  setUserData: (userData: UserTaskData) => void;
  refreshData: () => Promise<void>;
  loadScheduleTask: LoadScheduleItems;
  clearCache: () => void;
  calculateTaskTemp: () => Promise<void>;
};

export interface AddNewTask {
  (newTaskTitle: string, parentId: string, itsRepeat: boolean): string;
}

export interface CancelTask {
  (taskId: string): void;
}

export interface ActiveTask {
  (taskId: string): void;
}

export interface DoneTask {
  (taskId: string): void;
}

export interface UseTask {
  (isLoadingDefault?: boolean): UseTaskResponse;
}
