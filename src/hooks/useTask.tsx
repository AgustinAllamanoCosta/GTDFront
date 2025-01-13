import { useEffect, useState, useContext } from 'react';
import {
  ActiveTask,
  ActiveTasks,
  AddNewTask,
  CancelTask,
  DoneTask,
  GetItems,
  Task,
  UserTaskData,
  UseTask,
} from '../types/types';

import { ErrorHandlerContext } from '../contexts/errorHandlerContext';
import { UserInformationContext } from '../contexts/userContext';
import { repositoryFactory } from '../repository/repository';
import { firebaseData } from '../hooks/useFirebase';
import { configuration } from '../config/appConfig';
import { itemUtil } from './itemUtil';
import { userDataFactory } from '../factories/UserDataFactory';
import { taskFactory } from '../factories/TaskFactory';

export const useTask: UseTask = (
  isLoadingDefault: boolean | undefined = false,
) => {
  const errorContext = useContext(ErrorHandlerContext);
  const userInformation = useContext(UserInformationContext);

  const { getData, save } = repositoryFactory(configuration.environment)(
    userInformation.userData?.id ? userInformation.userData?.id : '',
    firebaseData.useFireBase,
  );

  const {
    mergeMaps,
    generateActiveItemsWithTemp,
    processMap,
    loadScheduleTask,
    orderItems,
    orderCancelItems,
    orderCompleteItems,
    archiveDoneTaskWithAfterAWeek,
    archiveCancelTaskWithAfterAWeek,
  } = itemUtil();

  const [userTaskData, setUserTaskData] =
    useState<UserTaskData>(userDataFactory());
  const [isLoading, setIsLoading] = useState<boolean>(isLoadingDefault);
  const [isClearCaching, setIsClearCaching] = useState<boolean>(false);

  const loadScheduleItems = () => {
    const newTask: Map<string, Task> = loadScheduleTask(
      userTaskData.scheduleTask,
      userTaskData.inboxItems,
    );
    userTaskData.inboxItems = newTask;
    setUserTaskData({ ...userTaskData });
  };

  const loadTask = async () => {
    try {
      const userTaskData: UserTaskData = await getData();
      Object.keys(userTaskData).forEach((key) => {
        const castKey = key as keyof typeof userTaskData;
        userTaskData[castKey] = mergeMaps(
          userTaskData[castKey],
          userTaskData[castKey],
        );
      });
      setUserTaskData({ ...userTaskData });
    } catch (error: any) {
      errorContext.setFlagError(true);
      errorContext.setError(error);
    }
  };

  const addNewTask: AddNewTask = (
    newTaskTitle: string,
    parentId: string,
    itsRepeat: boolean = false,
  ) => {
    const newTask: Task = taskFactory(true)(newTaskTitle, parentId, itsRepeat);
    userTaskData.inboxItems.set(newTask.id, newTask);
    if (itsRepeat) {
      userTaskData.scheduleTask.set(newTask.id, newTask);
    }
    setUserTaskData({ ...userTaskData });
    return newTask.id;
  };

  const cancelTask: CancelTask = (taskId: string) => {
    const taskToCancel: Task | undefined = userTaskData.inboxItems.get(taskId);
    if (taskToCancel) {
      taskToCancel.cancelationDate = new Date().toISOString();
      userTaskData.inboxItems.delete(taskId);
      userTaskData.scheduleTask.delete(taskId);
      userTaskData.cancelItems.set(taskToCancel.id, taskToCancel);
      setUserTaskData({ ...userTaskData });
    }
  };

  const activeTask: ActiveTask = (taskId: string) => {
    if (canActivate()) {
      const taskToActive: Task | undefined =
        userTaskData.inboxItems.get(taskId);
      if (taskToActive) {
        taskToActive.activationDate = new Date().toISOString();
        userTaskData.activeItems.set(taskId, taskToActive);
        userTaskData.inboxItems.delete(taskId);
        setUserTaskData({ ...userTaskData });
      }
    } else {
      throw new Error(
        'you need to complete a active task before to active a new one',
      );
    }
  };

  const doneTask: DoneTask = (taskId: string) => {
    const taskToDone: Task | undefined = userTaskData.activeItems.get(taskId);
    if (taskToDone) {
      taskToDone.completionDate = new Date().toISOString();
      userTaskData.doneItems.set(taskId, taskToDone);
      userTaskData.activeItems.delete(taskId);
      calculateItemsTemp();
    }
  };

  const getInboxTask = (taskId: string): Task | undefined => {
    return userTaskData.inboxItems.get(taskId);
  };

  const getActiveTask = (activeTaskId: string): Task | undefined => {
    return userTaskData.activeItems.get(activeTaskId);
  };

  const getInboxTaskToMap: GetItems = () => {
    return processMap(userTaskData.inboxItems, orderItems);
  };

  const getActiveTaskToMap: GetItems = () => {
    return processMap(userTaskData.activeItems, orderItems);
  };

  const getCancelTaskToMap: GetItems = () => {
    const latestCancelItems: Map<string, Task> =
      archiveCancelTaskWithAfterAWeek(userTaskData.cancelItems);
    return processMap(latestCancelItems, orderCancelItems);
  };

  const getDoneTaskToMap: GetItems = () => {
    const latestDoneItems: Map<string, Task> = archiveDoneTaskWithAfterAWeek(
      userTaskData.doneItems,
    );
    return processMap(latestDoneItems, orderCompleteItems);
  };

  const getIsLoading = (): boolean => isLoading;
  const canActivate = (): boolean => {
    return getActiveTaskToMap().length < 3;
  };

  const clearTask = () => {
    setIsClearCaching(true);
    setUserTaskData(userDataFactory());
  };

  const calculateItemsTemp = async () => {
    const itemsWithTemp: ActiveTasks = generateActiveItemsWithTemp(
      userTaskData.activeItems,
    );
    userTaskData.activeItems = itemsWithTemp;
    setUserTaskData({ ...userTaskData });
  };

  const isNewDataToStore = (userTaskData: UserTaskData): boolean => {
    let result: boolean = false;
    Object.keys(userTaskData).forEach((key) => {
      const castKey = key as keyof typeof userTaskData;
      if (userTaskData[castKey].size > 0) {
        result = true;
      }
    });
    return result;
  };

  useEffect(() => {
    if (userInformation?.userData?.id) {
      if (
        !getIsLoading() &&
        !isClearCaching &&
        isNewDataToStore(userTaskData)
      ) {
        save(userTaskData).catch((error: any) => {
          errorContext.setFlagError(true);
          errorContext.setError(error);
        });
      }

      if (isClearCaching) {
        setIsClearCaching(false);
      }
    }
  }, [isLoading, userTaskData, isClearCaching]);

  return {
    getIsLoading,
    getDoneTaskToMap,
    getCancelTaskToMap,
    getActiveTaskToMap,
    getActiveTask,
    getInboxTask,
    addNewTask,
    cancelTask,
    canActivate,
    activeTask,
    doneTask,
    getInboxTaskToMap,
    setUserTaskData,
    refreshData: loadTask,
    loadScheduleTask: loadScheduleItems,
    clearCache: clearTask,
    calculateTaskTemp: calculateItemsTemp,
  };
};
