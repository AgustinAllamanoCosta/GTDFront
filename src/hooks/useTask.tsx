import { useEffect, useState, useContext } from 'react';
import {
  ActiveTasks,
  ActiveTasksWithTemp,
  CancelTasks,
  DoneTasks,
  InboxTasks,
  Task,
  TaskWithTemp,
  UserTaskData,
} from '../types/types';
import { ErrorHandlerContext } from '../contexts/errorHandlerContext';
import { UserInformationContext } from '../contexts/userContext';
import { repository } from '../repository/repository';
import { firebaseData } from '../hooks/useFirebase';
import { v4 as uuidv4 } from 'uuid';
import { THEME_ONE } from '../constants/colors';

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
  const [scheduleTask, setScheduleTask] = useState<InboxTasks>(new Map());
  const [activeTaskWithTemp, setActiveTaskWithTemp] =
    useState<ActiveTasksWithTemp>([]);

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
        if (userTaskData.scheduleTask)
          setScheduleTask(userTaskData.scheduleTask);
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
      scheduleTask,
    };
    await save(taskToSave);
  };

  const addNewTask = (
    newTaskTitle: string,
    parentId: string,
    itsRepeat: boolean = false,
  ) => {
    const newTask: Task = {
      id: uuidv4(),
      title: newTaskTitle,
      parentTask: parentId,
      creationDate: new Date().toISOString(),
      points: 0,
      repiteTask: itsRepeat,
    };
    inboxItems.set(newTask.id, newTask);
    setInboxItems(new Map(inboxItems));
    if (itsRepeat) {
      scheduleTask.set(newTask.id, newTask);
      setScheduleTask(new Map(scheduleTask));
    }
    return newTask.id;
  };

  const cancelTask = (taskId: string) => {
    const taskToCancel: Task | undefined = inboxItems.get(taskId);
    if (taskToCancel) {
      inboxItems.delete(taskId);
      setInboxItems(new Map(inboxItems));
      scheduleTask.delete(taskId);
      setScheduleTask(new Map(scheduleTask));
      cancelItems.set(taskToCancel.id, taskToCancel);
      setCancelItems(new Map(cancelItems));
    }
  };

  const activeTask = (taskId: string) => {
    const taskToActive: Task | undefined = inboxItems.get(taskId);
    if (taskToActive) {
      taskToActive.activationDate = new Date().toISOString();
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
      calculateTaskTemp();
    }
  };

  const getInboxTask = (taskId: string): Task | undefined => {
    return inboxItems.get(taskId);
  };

  const getInboxTaskToMap = (): Array<Task> => {
    const itemsToReturn: Array<Task> = [...inboxItems.values()];
    return orderItems(itemsToReturn);
  };

  const getActiveTaskToMap = (): ActiveTasksWithTemp => {
    return orderItems(activeTaskWithTemp) as ActiveTasksWithTemp;
  };

  const getCancelTaskToMap = (): Array<Task> => {
    const itemsToReturn: Array<Task> = [...cancelItems.values()];
    return orderItems(itemsToReturn);
  };

  const getDoneTaskToMap = (): Array<Task> => {
    const itemsToReturn: Array<Task> = [...doneItems.values()];
    return orderItems(itemsToReturn);
  };

  const orderItems = (
    items: Array<Task> | ActiveTasksWithTemp,
  ): Array<Task> | ActiveTasksWithTemp => {
    return items.sort(
      (taskA: Task | TaskWithTemp, taskB: Task | TaskWithTemp) => {
        return Date.parse(taskA.creationDate) - Date.parse(taskB.creationDate);
      },
    );
  };

  const getIsLoading = (): boolean => isLoading;

  const clearTask = () => {
    setIsClearCaching(true);
    setDoneItems(new Map());
    setInboxItems(new Map());
    setActiveItems(new Map());
    setCancelItems(new Map());
    setScheduleTask(new Map());
  };

  const isDataToStore = (): boolean => {
    return (
      inboxItems.size > 0 ||
      activeItems.size > 0 ||
      cancelItems.size > 0 ||
      scheduleTask.size > 0 ||
      doneItems.size > 0
    );
  };

  const calculateBackgroundColor = (task: Task): string => {
    if (!task.activationDate) {
      return THEME_ONE.stickBackGround;
    }

    const taskDate: Date = new Date(task.activationDate);
    const diffBetweenDates: number = new Date().getTime() - taskDate.getTime();
    const hoursDiff: number = diffBetweenDates / (1000 * 60 * 60);

    if (hoursDiff >= 12) {
      return THEME_ONE.stickBackGroundWarm;
    } else if (hoursDiff >= 18) {
      return THEME_ONE.stickBackGroundHot;
    } else if (hoursDiff >= 20) {
      return THEME_ONE.stickBackGroundBurn;
    } else {
      return THEME_ONE.stickBackGround;
    }
  };

  const generateActiveTaskWithTemp = () => {
    const activeTask: Array<Task> = [...activeItems.values()];
    const activeTaskWithTemp: ActiveTasksWithTemp = activeTask.map(
      (item: Task): TaskWithTemp => {
        const backgroundColor: string = calculateBackgroundColor(item);
        return { ...item, backgroundColor };
      },
    );
    return activeTaskWithTemp;
  };

  const loadScheduleTask = async () => {
    const tasks: Array<Task> = [...scheduleTask.values()];
    const systemDate: Date = new Date();

    tasks.map((task: Task) => {
      const taskDate: Date = new Date(task.creationDate);
      const diffBetweenDates: number =
        systemDate.getTime() - taskDate.getTime();
      const hoursDiff: number = diffBetweenDates / (1000 * 60 * 60);

      if (hoursDiff >= 24) {
        inboxItems.set(task.id, task);
        setInboxItems(new Map(inboxItems));
      }
    });
  };

  const refreshData = async () => {
    await loadTask();
    await loadScheduleTask();
  };

  const calculateTaskTemp = async () => {
    const taskWithTemp: ActiveTasksWithTemp = generateActiveTaskWithTemp();
    setActiveTaskWithTemp(taskWithTemp);
  };

  useEffect(() => {
    loadScheduleTask();
  }, []);

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
    if (activeItems.size > 0) {
      calculateTaskTemp();
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
    refreshData: refreshData,
    clearCache: clearTask,
    calculateTaskTemp,
  };
};
