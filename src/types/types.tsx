export type UserData = {
  id: string | undefined;
  name: string;
  photoURL: string;
  accessToken: string;
};

export type Task = {
  id: string;
  title: string;
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
