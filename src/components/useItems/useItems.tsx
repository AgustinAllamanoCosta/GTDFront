import { ReactNode, useEffect } from 'react';
import { useTask } from '../../hooks/useTask';
import { TaskInformationContext } from '../../contexts/taskContext';
import {
  ActiveTasks,
  CancelTasks,
  DoneTasks,
  InboxTasks,
  UserTaskData,
  UseTaskResponse,
} from '../../types/types';
import { userDataFactory } from '../../factories/UserDataFactory';

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
  const useTaskfunctions: UseTaskResponse = useTask(loading);

  useEffect(() => {
    const defaultUserData: UserTaskData = userDataFactory();
    if (defaultActiveItems) defaultUserData.activeItems = defaultActiveItems;
    if (defaultItems) defaultUserData.inboxItems = defaultItems;
    if (defaultCancelItems) defaultUserData.cancelItems = defaultCancelItems;
    if (defaultDoneItems) defaultUserData.doneItems = defaultDoneItems;
    useTaskfunctions.setUserData(defaultUserData);
  }, []);

  return (
    <TaskInformationContext.Provider value={useTaskfunctions}>
      {children}
    </TaskInformationContext.Provider>
  );
};

export default ItemsContext;
