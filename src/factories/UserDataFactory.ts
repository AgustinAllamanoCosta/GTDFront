import {
  ActiveTasks,
  CancelTasks,
  DoneTasks,
  InboxTasks,
  UserTaskData,
} from '../types/types';

export const userDataFactory = (
  activeItems?: ActiveTasks,
  cancelItems?: CancelTasks,
  doneItems?: DoneTasks,
  inboxItems?: InboxTasks,
  scheduleItems?: InboxTasks,
): UserTaskData => {
  const newUserTaskData: UserTaskData = {
    activeItems: activeItems ? activeItems : new Map(),
    cancelItems: cancelItems ? cancelItems : new Map(),
    doneItems: doneItems ? doneItems : new Map(),
    inboxItems: inboxItems ? inboxItems : new Map(),
    scheduleTask: scheduleItems ? scheduleItems : new Map(),
  };
  return newUserTaskData;
};

export const userDataFactoryFromData = (localData: any): UserTaskData => {
  const userTasksData = userDataFactory() as any;
  Object.keys(userTasksData).forEach((key) => {
    if (localData[key])
      userTasksData[key] = new Map(Object.entries(localData[key]));
  });
  return userTasksData as UserTaskData;
};

export const userDataDocumentFactory = (userData: any): any => {
  const document: any = {};
  Object.keys(userData).forEach((key) => {
    document[key] = Object.fromEntries(userData[key]);
  });
  return document;
};
