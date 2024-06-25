import { ReactNode, useEffect } from 'react';
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
  loading?: boolean;
  children: ReactNode;
};

const ItemsContext = ({
  defaultItems,
  defaultCancelItems,
  defaultDoneItems,
  defaultActiveItems,
  loading,
  children,
}: ItemsContextPorps) => {
  const {
    getIsLoading,
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
    clearCache,
    calculateTaskTemp,
  } = useTask();

  const taskInfoContextValue = {
    getIsLoading: loading != undefined ? () => loading : getIsLoading,
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
    refreshData,
    clearCache,
    calculateTaskTemp,
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
