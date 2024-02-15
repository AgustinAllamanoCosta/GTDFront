import { type } from "cypress/types/jquery";

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
  points?: number;
  parentTask?: string;
  childTask?: {
    taksOne: string;
    taksTwo: string;
  };
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
  openAIAPIKey: string;
  openAIModel: string;
};
