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
  activationDate?: string;
  repiteTask?: boolean;
  points?: number;
  parentTask?: string;
  childTask?: {
    taskOne: string;
    taskTwo: string;
  };
};

export type TaskWithTemp = Task & { backgroundColor: string };

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
export type ActiveTasksWithTemp = TaskWithTemp[];

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
  backendURL: string;
};
