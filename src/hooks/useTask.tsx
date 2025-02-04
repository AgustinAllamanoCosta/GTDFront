import { useState, useEffect } from 'react';
import {
  ActiveTask,
  ActiveTasks,
  AddNewTask,
  CancelTask,
  DoneTask,
  GetItems,
  Task,
  UseTask,
} from '../types/types';

import { itemUtil } from './itemUtil';
import { taskFactory } from '../factories/TaskFactory';
import { taskHandler } from './taskHandler';

export const useTask: UseTask = (
  isLoadingDefault: boolean | undefined = false,
) => {
  const {
    generateActiveItemsWithTemp,
    processMap,
    orderItems,
    orderCancelItems,
    orderCompleteItems,
    filterItems,
  } = itemUtil();

  const {
    saveData,
    userTaskData,
    setUserTaskData,
    isLoading,
    loadScheduleTask,
    refreshData,
    loadDataForFirstTime,
    clearTask,
  } = taskHandler(isLoadingDefault);

  const [isNewDataToStore, setIsNewDataToStore] = useState<boolean>(false);
  const [filterCriterea, setFilterCriterea] = useState<string>('');

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

  const calculateItemsTemp = async () => {
    const itemsWithTemp: ActiveTasks = generateActiveItemsWithTemp(
      userTaskData.activeItems,
    );
    userTaskData.activeItems = itemsWithTemp;
    setUserTaskData({ ...userTaskData });
  };

  useEffect(() => {
    if (isNewDataToStore) {
      saveData();
      setIsNewDataToStore(false);
    }
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
    refreshData,
    loadDataForFirstTime,
    loadScheduleTask,
    clearCache: clearTask,
    calculateTaskTemp: calculateItemsTemp,
  };
};
