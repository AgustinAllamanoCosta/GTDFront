import { useEffect, useState, useContext } from 'react';
import {
  ActiveTasks,
  CancelTasks,
  DoneTasks,
  InboxTasks,
  Task,
  UserTaskData,
} from '../types/types';
import { ErrorHandlerContext } from '../contexts/errorHandlerContext';
import { UserInformationContext } from '../contexts/userContext';
import { repository } from '../repository/repository';
import { firebaseData } from '../hooks/useFirebase';
import { v4 as uuidv4 } from 'uuid';
import { useAIAssistance } from './useAIAssistance';
import { configuration } from '../config/appConfig';

export const useTask = () => {
  const errorContext = useContext(ErrorHandlerContext);
  const userInformation = useContext(UserInformationContext);
  const { estimateTask } = useAIAssistance(configuration);

  const { getData, save, clearCache } = repository(
    userInformation.userData?.id ? userInformation.userData?.id : '',
    firebaseData.useFireBase,
  );

  const [activeItems, setActiveItems] = useState<ActiveTasks>(new Map());
  const [cancelItems, setCancelItems] = useState<CancelTasks>(new Map());
  const [inboxItems, setInboxItems] = useState<InboxTasks>(new Map());
  const [doneItems, setDoneItems] = useState<DoneTasks>(new Map());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isClearCaching, setIsClearCaching] = useState<boolean>(false);

  const loadTask = async () => {
    try {
      if (userInformation?.userData?.id) {
        setIsLoading(true);
        const userTaskData: UserTaskData = await getData();
        if (userTaskData.doneItems) setDoneItems(userTaskData.doneItems);
        if (userTaskData.inboxItems) setInboxItems(userTaskData.inboxItems);
        if (userTaskData.activeItems) setActiveItems(userTaskData.activeItems);
        if (userTaskData.cancelItems) setCancelItems(userTaskData.cancelItems);
        setIsLoading(false);
      }
    } catch (error: any) {
      errorContext.setFlagError(true);
      errorContext.setError(error);
    }
  };

  const saveTask = async () => {
    const taskToSave: UserTaskData = {
      activeItems,
      cancelItems,
      doneItems,
      inboxItems,
    };
    await save(taskToSave);
  };

  const addNewTask = (newTaskTitle: string, parentId: string) => {
    const newTask: Task = {
      id: uuidv4(),
      title: newTaskTitle,
      parentTask: parentId,
      creationDate: new Date().toISOString(),
      points: 0,
    };
    if (false) {
      estimateTask(newTask)
        .then((taksWithEstimation: Task) => {
          inboxItems.set(taksWithEstimation.id, taksWithEstimation);
          setInboxItems(new Map(inboxItems));
        })
        .catch((error: any) => {
          inboxItems.set(newTask.id, newTask);
          setInboxItems(new Map(inboxItems));
        });
    }
    inboxItems.set(newTask.id, newTask);
    setInboxItems(new Map(inboxItems));
    return newTask.id;
  };

  const cancelTask = (taskId: string) => {
    const taskToCancel: Task | undefined = inboxItems.get(taskId);
    if (taskToCancel) {
      inboxItems.delete(taskId);
      setInboxItems(new Map(inboxItems));
      cancelItems.set(taskToCancel.id, taskToCancel);
      setCancelItems(new Map(cancelItems));
    }
  };

  const activeTask = (taskId: string) => {
    const taskToActive: Task | undefined = inboxItems.get(taskId);
    if (taskToActive) {
      activeItems.set(taskId, taskToActive);
      inboxItems.delete(taskId);
      setActiveItems(new Map(activeItems));
      setInboxItems(new Map(inboxItems));
    }
  };

  const doneTask = (taskId: string) => {
    const taskToDone: Task | undefined = activeItems.get(taskId);
    if (taskToDone) {
      doneItems.set(taskId, taskToDone);
      activeItems.delete(taskId);
      setDoneItems(new Map(doneItems));
      setActiveItems(new Map(activeItems));
    }
  };

  const getInboxTask = (taskId: string): Task | undefined => {
    return inboxItems.get(taskId);
  };

  const getInboxTaskToMap = (): Array<Task> => {
    const itemsToReturn: Array<Task> = [...inboxItems.values()];
    return orderItems(itemsToReturn);
  };

  const getActiveTaskToMap = (): Array<Task> => {
    const itemsToReturn: Array<Task> = [...activeItems.values()];
    return orderItems(itemsToReturn);
  };

  const getCancelTaskToMap = (): Array<Task> => {
    const itemsToReturn: Array<Task> = [...cancelItems.values()];
    return orderItems(itemsToReturn);
  };

  const getDoneTaskToMap = (): Array<Task> => {
    const itemsToReturn: Array<Task> = [...doneItems.values()];
    return orderItems(itemsToReturn);
  };

  const orderItems = (items: Array<Task>): Array<Task> => {
    return items.sort((taskA: Task, taskB: Task) => {
      return Date.parse(taskA.creationDate) - Date.parse(taskB.creationDate);
    });
  };

  const getIsLoading = (): boolean => isLoading;

  const clearTask = () => {
    setIsClearCaching(true);
    clearCache();
    setDoneItems(new Map());
    setInboxItems(new Map());
    setActiveItems(new Map());
    setCancelItems(new Map());
  };

  useEffect(() => {
    if (userInformation?.userData?.id) {
      if (!isLoading && !isClearCaching) {
        saveTask().catch((error: any) => {
          errorContext.setFlagError(true);
          errorContext.setError(error);
        });
      }

      if (isClearCaching) {
        setIsClearCaching(false);
      }
    }
  }, [
    userInformation.userData?.id,
    activeItems,
    doneItems,
    cancelItems,
    inboxItems,
  ]);

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
    setActiveItems,
    setCancelItems,
    setDoneItems,
    setInboxTask: setInboxItems,
    refreshData: loadTask,
    clearCache: clearTask,
  };
};
