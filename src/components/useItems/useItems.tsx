import { ReactNode, useEffect, useMemo } from 'react';
import { useTask } from '../../hooks/useTask';
import { TaskInformationContext } from '../../contexts/taskContext';
import {
  ActiveTasks,
  CancelTasks,
  DoneTasks,
  InboxTasks,
} from '../../types/types';

type ItemsContextPorps = {
  defaultItems?: InboxTasks;
  defaultCancelItems?: CancelTasks;
  defaultDoneItems?: DoneTasks;
  defaultActiveItems?: ActiveTasks;
  children: ReactNode;
};

const ItemsContext = ({
  defaultItems,
  defaultCancelItems,
  defaultDoneItems,
  defaultActiveItems,
  children,
}: ItemsContextPorps) => {
  const {
    getActiveTaskToMap,
    getCancelTaskToMap,
    getDoneTaskToMap,
    getInboxTaskToMap,
    addNewTask,
    cancelTask,
    activeTask,
    doneTask,
    getInboxTask,
    setInboxTask,
    setDoneItems,
    setActiveItems,
    setCancelItems,
    refreshData,
  } = useTask();

  const taskInfoContextValue = {
    getActiveTaskToMap,
    getCancelTaskToMap,
    getDoneTaskToMap,
    getInboxTaskToMap,
    addNewTask,
    cancelTask,
    activeTask,
    doneTask,
    getInboxTask,
    setActiveItems,
    setInboxTask,
    setCancelItems,
    setDoneItems,
    refreshData: refreshData,
  };

  useEffect(() => {
    if (defaultActiveItems) setActiveItems(defaultActiveItems);
    if (defaultItems) setInboxTask(defaultItems);
    if (defaultCancelItems) setCancelItems(defaultCancelItems);
    if (defaultDoneItems) setDoneItems(defaultDoneItems);
  }, []);

  return (
    <TaskInformationContext.Provider value={taskInfoContextValue}>
      {children}
    </TaskInformationContext.Provider>
  );
};

export default ItemsContext;
