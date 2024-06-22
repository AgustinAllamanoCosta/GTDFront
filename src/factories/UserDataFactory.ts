import { UserTaskData } from '../types/types';

export const userDataFactory = (): UserTaskData => {
  const newUserTaskData: UserTaskData = {
    activeItems: new Map(),
    cancelItems: new Map(),
    doneItems: new Map(),
    inboxItems: new Map(),
    scheduleTask: new Map(),
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
