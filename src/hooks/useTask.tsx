import { useState, useContext, useEffect } from 'react';
import {
  ActiveTask,
  ActiveTasks,
  AddNewTask,
  ArchiveItems,
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
import {
  FIRE_BASE_COLLECTION_NAME,
  FIRE_HISTORIC_COLLECTION_NAME,
} from '../constants/keys';

export const useTask: UseTask = (
  isLoadingDefault: boolean | undefined = false,
) => {
  const errorContext = useContext(ErrorHandlerContext);
  const userInformation = useContext(UserInformationContext);

  const { getData, save } = repositoryFactory(configuration.environment)(
    userInformation.userData?.id ? userInformation.userData?.id : '',
    firebaseData.useFireBase,
    FIRE_BASE_COLLECTION_NAME,
  );

  const archive = repositoryFactory(configuration.environment)(
    userInformation.userData?.id ? userInformation.userData?.id : '',
    firebaseData.useFireBase,
    FIRE_HISTORIC_COLLECTION_NAME,
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
    filterItems,
  } = itemUtil();

  const [userTaskData, setUserTaskData] =
    useState<UserTaskData>(userDataFactory());
  const [isNewDataToStore, setIsNewDataToStore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(isLoadingDefault);
  const [filterCriterea, setFilterCriterea] = useState<string>('');

  const loadScheduleItems = () => {
    const newTask: Map<string, Task> = loadScheduleTask(
      userTaskData.scheduleTask,
      userTaskData.inboxItems,
    );
    userTaskData.inboxItems = newTask;
    setUserTaskData({ ...userTaskData });
  };

  const updateTask = async () => {
    try {
      if (userInformation?.userData?.id) {
        const userTaskDataOnRemote: UserTaskData = await getData();
        let isDataToUpdate: boolean = false;
        Object.keys(userTaskDataOnRemote).forEach((key) => {
          const castKey = key as keyof typeof userTaskDataOnRemote;
          if (userTaskDataOnRemote[castKey].size > 0) {
            isDataToUpdate = true;
          }
        });

        if (isDataToUpdate) {
          const rawLocalData: string | null = localStorage.getItem(
            userInformation.userData.id,
          );
          if (rawLocalData != null) {
            const localData: UserTaskData = JSON.parse(rawLocalData);
            Object.keys(localData).forEach((key) => {
              const castKey = key as keyof typeof userTaskData;
              if (localData[castKey].size > 0) {
                userTaskDataOnRemote[castKey] = mergeMaps(
                  userTaskDataOnRemote[castKey],
                  localData[castKey],
                );
              }
            });
          }
          setUserTaskData(userTaskDataOnRemote);
          localStorage.setItem(
            userInformation.userData.id,
            JSON.stringify(userTaskDataOnRemote),
          );
        }
      }
    } catch (error: any) {
      errorContext.setFlagError(true);
      errorContext.setError(error);
    }
  };

  const archiveOldCancelAndDoneTask = async () => {
    try {
      const userTaskDataOnRemote: UserTaskData = await getData();
      const latestCancelItems: ArchiveItems = archiveCancelTaskWithAfterAWeek(
        userTaskDataOnRemote.cancelItems,
      );
      const latestDoneItems: ArchiveItems = archiveDoneTaskWithAfterAWeek(
        userTaskDataOnRemote.doneItems,
      );
      userTaskDataOnRemote.cancelItems = latestCancelItems.noArchiveItems;
      userTaskDataOnRemote.doneItems = latestDoneItems.noArchiveItems;
      const archiveItems = userDataFactory();
      archiveItems.doneItems = latestDoneItems.archiveItems;
      archiveItems.cancelItems = latestCancelItems.archiveItems;
      if (
        archiveItems.doneItems.size > 0 ||
        archiveItems.cancelItems.size > 0
      ) {
        await archive.save(archiveItems);
        await save(userTaskDataOnRemote);
        setUserTaskData(userTaskDataOnRemote);
      }
    } catch (error: any) {
      errorContext.setFlagError(true);
      errorContext.setError(error);
    }
  };

  const saveData = async () => {
    try {
      if (isNewDataToStore && userInformation?.userData?.id) {
        localStorage.setItem(
          userInformation.userData.id,
          JSON.stringify(userTaskData),
        );
        await save(userTaskData);
        setIsNewDataToStore(false);
      }
    } catch (error: any) {
      errorContext.setFlagError(true);
      errorContext.setError(error);
    }
  };

  const loadDataForFirstTime = async () => {
    try {
      setIsLoading(true);
      await updateTask();
      await archiveOldCancelAndDoneTask();
    } catch (error) {
      console.error('Error in loadDataForFirstTime:', error);
    } finally {
      setIsLoading(false);
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
    setIsNewDataToStore(true);
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
      setIsNewDataToStore(true);
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
        setIsNewDataToStore(true);
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
      setIsNewDataToStore(true);
    }
  };

  const setFilter = (filter: string | undefined) => {
    if (filter) {
      setFilterCriterea(filter);
    } else {
      setFilterCriterea('');
    }
  };

  const getInboxTask = (taskId: string): Task | undefined => {
    return userTaskData.inboxItems.get(taskId);
  };

  const getActiveTask = (activeTaskId: string): Task | undefined => {
    return userTaskData.activeItems.get(activeTaskId);
  };

  const getInboxTaskToMap: GetItems = () => {
    const items: Array<Task> = processMap(userTaskData.inboxItems, orderItems);
    return filterItems(items, filterCriterea);
  };

  const getActiveTaskToMap: GetItems = () => {
    const items: Array<Task> = processMap(userTaskData.activeItems, orderItems);
    return filterItems(items, filterCriterea);
  };

  const getCancelTaskToMap: GetItems = () => {
    const items: Array<Task> = processMap(
      userTaskData.cancelItems,
      orderCancelItems,
    );
    return filterItems(items, filterCriterea);
  };

  const getDoneTaskToMap: GetItems = () => {
    const items: Array<Task> = processMap(
      userTaskData.doneItems,
      orderCompleteItems,
    );
    return filterItems(items, filterCriterea);
  };

  const getIsLoading = (): boolean => isLoading;
  const canActivate = (): boolean => {
    return getActiveTaskToMap().length < 3;
  };

  const clearTask = () => {
    setUserTaskData(userDataFactory());
  };

  const calculateItemsTemp = async () => {
    const itemsWithTemp: ActiveTasks = generateActiveItemsWithTemp(
      userTaskData.activeItems,
    );
    userTaskData.activeItems = itemsWithTemp;
    setUserTaskData({ ...userTaskData });
  };

  useEffect(() => {
    saveData();
  }, [isNewDataToStore]);

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
    setFilter,
    refreshData: updateTask,
    loadDataForFirstTime: loadDataForFirstTime,
    loadScheduleTask: loadScheduleItems,
    clearCache: clearTask,
    calculateTaskTemp: calculateItemsTemp,
  };
};
