import { THEME_ONE } from '../constants/colors';
import { ActiveTasks, ItemUtil, Task } from '../types/types';

export const itemUtil: ItemUtil = () => {
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

  const generateActiveItemsWithTemp = (
    activeItems: Map<string, Task>,
  ): ActiveTasks => {
    for (const [key, item] of activeItems) {
      item.backgroundColor = calculateBackgroundColor(item);
      activeItems.set(key, item);
    }
    return new Map([...activeItems]);
  };

  const loadScheduleTask = (
    scheduleItems: Map<string, Task>,
    inboxItems: Map<string, Task>,
  ): Map<string, Task> => {
    const systemDate: Date = new Date();

    for (const [key, item] of scheduleItems) {
      const itemDate: Date = new Date(item.creationDate);
      const diffBetweenDates: number =
        systemDate.getTime() - itemDate.getTime();
      const hoursDiff: number = diffBetweenDates / (1000 * 60 * 60);

      if (hoursDiff >= 24 && !inboxItems.has(key)) {
        inboxItems.set(key, item);
      }
    }
    return new Map(inboxItems);
  };

  const archiveDoneTaskWithAfterAWeek = (
    itemList: Map<string, Task>,
  ): Map<string, Task> => {
    const systemDate: Date = new Date();
    const itemNotArchive: Map<string, Task> = new Map<string, Task>();

    for (const [key, item] of itemList) {
      if (item.completionDate) {
        const itemDate: Date = new Date(item.completionDate);
        const diffBetweenDates: number =
          systemDate.getTime() - itemDate.getTime();
        const hoursDiff: number = diffBetweenDates / (1000 * 60 * 60);

        if (hoursDiff < 168) {
          itemNotArchive.set(key, item);
        }
      }
    }
    return itemNotArchive;
  };

  const archiveCancelTaskWithAfterAWeek = (
    itemList: Map<string, Task>,
  ): Map<string, Task> => {
    const systemDate: Date = new Date();
    const itemNotArchive: Map<string, Task> = new Map<string, Task>();

    for (const [key, item] of itemList) {
      if (item.cancelationDate) {
        const itemDate: Date = new Date(item.cancelationDate);
        const diffBetweenDates: number =
          systemDate.getTime() - itemDate.getTime();
        const hoursDiff: number = diffBetweenDates / (1000 * 60 * 60);

        if (hoursDiff < 168) {
          itemNotArchive.set(key, item);
        }
      }
    }
    return itemNotArchive;
  };

  const mergeMaps = (
    newMap: Map<string, Task> | undefined,
    oldMap: Map<string, Task>,
  ): Map<string, Task> => {
    if (newMap) {
      return new Map([...oldMap, ...newMap]);
    } else {
      return oldMap;
    }
  };

  const processMap = (
    mapToProcess: Map<string, Task>,
    orderCallback: Function,
  ): Array<Task> => {
    if (mapToProcess.size > 0) {
      const items: Array<Task> = [...mapToProcess.values()];
      return orderCallback(items);
    } else {
      return [];
    }
  };

  const orderItems = (items: Array<Task>): Array<Task> => {
    return items.sort((taskA: Task, taskB: Task) => {
      return Date.parse(taskA.creationDate) - Date.parse(taskB.creationDate);
    });
  };

  const orderCancelItems = (items: Array<Task>): Array<Task> => {
    return items.sort((taskA: Task, taskB: Task) => {
      if (taskA.cancelationDate && taskB.cancelationDate) {
        return (
          Date.parse(taskA.cancelationDate) - Date.parse(taskB.cancelationDate)
        );
      } else {
        return 0;
      }
    });
  };

  const orderCompleteItems = (items: Array<Task>): Array<Task> => {
    return items.sort((taskA: Task, taskB: Task) => {
      if (taskA.completionDate && taskB.completionDate) {
        return (
          Date.parse(taskA.completionDate) - Date.parse(taskB.completionDate)
        );
      } else {
        return 0;
      }
    });
  };

  return {
    loadScheduleTask,
    archiveDoneTaskWithAfterAWeek,
    archiveCancelTaskWithAfterAWeek,
    orderItems,
    orderCancelItems,
    orderCompleteItems,
    processMap,
    mergeMaps,
    generateActiveItemsWithTemp,
    calculateBackgroundColor,
  };
};
