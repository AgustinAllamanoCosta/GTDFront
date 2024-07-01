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

export const useTask: UseTask = (isLoadingDefualt: boolean = true) => {
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
  } = itemUtil();

  const [userData, setUserData] = useState<UserTaskData>(userDataFactory());
  const [isLoading, setIsLoading] = useState<boolean>(isLoadingDefualt);
  const [isClearCaching, setIsClearCaching] = useState<boolean>(false);

  const saveTask = async () => {
    await save(userData);
  };

  const loadScheduleItems = () => {
    const newTask: Map<string, Task> = loadScheduleTask(
      userData.scheduleTask,
      userData.inboxItems,
    );
    userData.inboxItems = newTask;
    setUserData({ ...userData });
  };

  const loadTask = async () => {
    try {
      if (userInformation?.userData?.id) {
        setIsLoading(true);
        const userTaskData: UserTaskData = await getData();
        const newUserData: UserTaskData = userDataFactory();
        Object.keys(userTaskData).forEach((key) => {
          const castKey = key as keyof typeof userTaskData;
          newUserData[castKey] = mergeMaps(
            userTaskData[castKey],
            userData[castKey],
          );
        });
        setUserData(newUserData);
        setIsLoading(false);
      }
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
    userData.inboxItems.set(newTask.id, newTask);
    if (itsRepeat) {
      userData.scheduleTask.set(newTask.id, newTask);
    }
    setUserData({ ...userData });
    return newTask.id;
  };

  const cancelTask: CancelTask = (taskId: string) => {
    const taskToCancel: Task | undefined = userData.inboxItems.get(taskId);
    if (taskToCancel) {
      userData.inboxItems.delete(taskId);
      userData.scheduleTask.delete(taskId);
      userData.cancelItems.set(taskToCancel.id, taskToCancel);
      setUserData({ ...userData });
    }
  };

  const activeTask: ActiveTask = (taskId: string) => {
    const taskToActive: Task | undefined = userData.inboxItems.get(taskId);
    if (taskToActive) {
      taskToActive.activationDate = new Date().toISOString();
      userData.activeItems.set(taskId, taskToActive);
      userData.inboxItems.delete(taskId);
      setUserData({ ...userData });
    }
  };

  const doneTask: DoneTask = (taskId: string) => {
    const taskToDone: Task | undefined = userData.activeItems.get(taskId);
    if (taskToDone) {
      userData.doneItems.set(taskId, taskToDone);
      userData.activeItems.delete(taskId);
      calculateItemsTemp();
    }
  };

  const getInboxTask = (taskId: string): Task | undefined => {
    return userData.inboxItems.get(taskId);
  };

  const getInboxTaskToMap: GetItems = () => {
    return processMap(userData.inboxItems);
  };

  const getActiveTaskToMap: GetItems = () => {
    return processMap(userData.activeItems);
  };

  const getCancelTaskToMap: GetItems = () => {
    return processMap(userData.cancelItems);
  };

  const getDoneTaskToMap: GetItems = () => {
    return processMap(userData.doneItems);
  };
  const getIsLoading = (): boolean => isLoading;

  const clearTask = () => {
    setIsClearCaching(true);
    setUserData(userDataFactory());
  };

  const isDataToStore = (): boolean => {
    return (
      userData.inboxItems.size > 0 ||
      userData.activeItems.size > 0 ||
      userData.cancelItems.size > 0 ||
      userData.scheduleTask.size > 0 ||
      userData.doneItems.size > 0
    );
  };

  const calculateItemsTemp = async () => {
    const itemsWithTemp: ActiveTasks = generateActiveItemsWithTemp(
      userData.activeItems,
    );
    userData.activeItems = itemsWithTemp;
    setUserData({ ...userData });
  };

  useEffect(() => {
    if (userInformation?.userData?.id) {
      if (!getIsLoading() && !isClearCaching && isDataToStore()) {
        saveTask().catch((error: any) => {
          errorContext.setFlagError(true);
          errorContext.setError(error);
        });
      }

      if (isClearCaching) {
        setIsClearCaching(false);
      }
    }
  }, [userInformation.userData?.id, userData]);

  return {
    getIsLoading,
    getDoneTaskToMap,
    getCancelTaskToMap,
    getActiveTaskToMap,
    getInboxTask,
    addNewTask,
    cancelTask,
    activeTask,
    doneTask,
    getInboxTaskToMap,
    setUserData,
    refreshData: loadTask,
    loadScheduleTask: loadScheduleItems,
    clearCache: clearTask,
    calculateTaskTemp: calculateItemsTemp,
  };
};
