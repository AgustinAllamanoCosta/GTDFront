export type UserData = {
  id: string | undefined;
  name: string;
  photoURL: string;
  accessToken: string;
};

export type Task = {
  id: string;
  title: string;
  isComplete: boolean;
  isCancele: boolean;
  isActive: boolean;
  parentTask?: string;
  childTask?: {
    taksOne: string;
    taksTwo: string;
  };
};

export type ActiveTasks = Array<Task>;
export type InboxTasks = Array<Task>;
export type Tasks = Array<Task>;
