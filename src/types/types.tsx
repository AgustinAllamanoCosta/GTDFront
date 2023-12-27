export type UserData = {
  id: string;
  name: string;
  photoURL: string;
};

export type Task = {
  id: string;
  title: string;
  isComplete: boolean;
  isCancele: boolean;
  isActive: boolean;
};

export type ActiveTasks = Array<Task>;
export type InboxTasks = Array<Task>;
export type Tasks = Array<Task>;
