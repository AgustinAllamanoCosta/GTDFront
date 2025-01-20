import { Firestore } from 'firebase/firestore';
import { ReactNode } from 'react';

export type AppContextProps = {
  children: ReactNode;
};

export interface BusEvent {
  name: string;
  data?: any;
}

export interface Subscriber {
  subscriberName: string;
  subscriberFunction: (event: BusEvent) => void;
}

export type CardProps = {
  content_center?: boolean;
  padding?: boolean;
  children?: string | React.JSX.Element | React.JSX.Element[];
};

export type ToastProp = {
  children?: string | React.JSX.Element | React.JSX.Element[];
  onClose: () => void;
};

export type ItemListProps = {
  id?: string;
};

export type CardWithTitleProps = {
  title?: string;
  label?: string;
  joinTag?: boolean;
  children?: string | React.JSX.Element | React.JSX.Element[];
};

export type ButtonProps = {
  text: string;
  icon?: string;
  onClick: (e: any) => void;
};

export type UserCardProps = {
  userName: string;
  userPhoto: string;
  logout: () => void;
};

export type StickyNoteProps = {
  number: string;
  text: string;
  backgroundColor: string;
  onConfirm?: (event: any) => void;
};

export type ItemProps = {
  title: string;
  onMouseOver?: (e: any) => void;
  onClick?: (e: any) => void;
};

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
  cancelationDate?: string;
  completionDate?: string;
  repiteTask?: boolean;
  points?: number;
  parentTask?: string;
  childTask?: {
    taskOne: string;
    taskTwo: string;
  };
};

export type ItemWithActionsProps = {
  title: string;
  onCancel: () => void;
  onActive: () => void;
  onSplit: (taskOne: string, taskTwo: string) => void;
};

export type DraggableItemProps = {
  id: string;
} & ItemWithActionsProps;

export type DraggableStickyNoteProps = {
  id: string;
} & StickyNoteProps;

export type ItemSplitProps = {
  taskToSplit: string;
  onCancel: () => void;
  onSplit: (taskOne: string, taskTwo: string) => void;
};

export type CarouselProps = {
  children: React.JSX.Element[];
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

export interface ArchiveDoneTaskWithAfterAWeek {
  (filterToList: Map<string, Task>): Map<string, Task>;
}

export interface ArchiveCancelTaskWithAfterAWeek {
  (filterToList: Map<string, Task>): Map<string, Task>;
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
  (mapToProcess: Map<string, Task>, callBack: Function): Array<Task>;
}

export interface OrderItems {
  (items: Array<Task>): Array<Task>;
}

export interface CalculateBackgroundColor {
  (task: Task): string;
}

export type ItemsContextPorps = {
  defaultItems?: InboxTasks;
  defaultCancelItems?: CancelTasks;
  defaultDoneItems?: DoneTasks;
  defaultActiveItems?: ActiveTasks;
  loading?: boolean;
  children: ReactNode;
};

export type TaskViewProps = {
  environment: string;
  inboxTasks?: InboxTasks;
  userData?: UserData;
  refreshTaskInterval?: number;
  loadScheduleTask?: number;
  calculateTaskTemp?: number;
  showToast?: boolean;
};

export interface ItemUtil {
  (): {
    loadScheduleTask: LoadScheduleTask;
    archiveDoneTaskWithAfterAWeek: ArchiveDoneTaskWithAfterAWeek;
    archiveCancelTaskWithAfterAWeek: ArchiveCancelTaskWithAfterAWeek;
    orderItems: OrderItems;
    orderCompleteItems: OrderItems;
    orderCancelItems: OrderItems;
    processMap: ProcessMap;
    mergeMaps: MergeMaps;
    generateActiveItemsWithTemp: GenerateActiveItemsWithTemp;
    calculateBackgroundColor: CalculateBackgroundColor;
  };
}

export interface GetItems {
  (): Array<Task>;
}

export type ItemAddButtonProps = {
  action: (value: string) => void;
  characterLimit: number;
  onMakeDaily?: (value: string) => void;
  dataTest?: string;
  disable?: boolean;
};

export type UseTaskResponse = {
  getIsLoading: () => boolean;
  canActivate: () => boolean;
  getDoneTaskToMap: GetItems;
  getCancelTaskToMap: GetItems;
  getActiveTaskToMap: GetItems;
  getActiveTask: (taskId: string) => Task | undefined;
  getInboxTaskToMap: GetItems;
  getInboxTask: (taskId: string) => Task | undefined;
  addNewTask: AddNewTask;
  cancelTask: CancelTask;
  activeTask: ActiveTask;
  doneTask: DoneTask;
  setUserTaskData: (userData: UserTaskData) => void;
  refreshData: () => Promise<void>;
  loadDataForFirstTime: () => Promise<void>;
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
