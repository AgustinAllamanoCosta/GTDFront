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

export const useTask = () => {
  const errorContext = useContext(ErrorHandlerContext);
  const userInformation = useContext(UserInformationContext);
  const { getData, save } = repository(
    userInformation.userData?.id ? userInformation.userData?.id : '',
    firebaseData.useFireBase,
  );

  const [activeItems, setActiveItems] = useState<ActiveTasks>(new Map());
  const [cancelItems, setCancelItems] = useState<CancelTasks>(new Map());
  const [inboxItems, setInboxItems] = useState<InboxTasks>(new Map());
  const [doneItems, setDoneItems] = useState<DoneTasks>(new Map());

  const loadTask = async () => {
    try {
      if (userInformation?.userData?.id) {
        const userTaskData: UserTaskData = await getData();
        if (userTaskData.doneItems) setDoneItems(userTaskData.doneItems);
        if (userTaskData.inboxItems) setInboxItems(userTaskData.inboxItems);
        if (userTaskData.activeItems) setActiveItems(userTaskData.activeItems);
        if (userTaskData.cancelItems) setCancelItems(userTaskData.cancelItems);
      }
    } catch (error: any) {
      errorContext.setFlagError(true);
      errorContext.setError(error);
    }
  };

  const processItems = async () => {
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
    };
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
      setActiveItems(new Map(activeItems));
    }
  };

  const doneTask = (taskId: string) => {
    const taskToDone: Task | undefined = activeItems.get(taskId);
    if (taskToDone) {
      doneItems.set(taskId, taskToDone);
      setDoneItems(new Map(doneItems));
    }
  };

  const getInboxTask = (taskId: string): Task | undefined => {
    return inboxItems.get(taskId);
  };

  const getInboxTaskToMap = (): Array<Task> => {
    if (inboxItems.size > 0) return [...inboxItems.values()];
    else return [];
  };

  const getActiveTaskToMap = (): Array<Task> => {
    if (activeItems.size > 0) return [...activeItems.values()];
    else return [];
  };

  const getCancelTaskToMap = (): Array<Task> => {
    if (cancelItems.size > 0) return [...cancelItems.values()];
    else return [];
  };

  const getDoneTaskToMap = (): Array<Task> => {
    if (doneItems.size > 0) return [...doneItems.values()];
    else return [];
  };

  useEffect(() => {
    if (userInformation?.userData?.id)
      processItems().catch((error: any) => {
        errorContext.setFlagError(true);
        errorContext.setError(error);
      });
  }, [
    userInformation.userData?.id,
    activeItems,
    doneItems,
    cancelItems,
    inboxItems,
  ]);

  return {
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
  };
};
