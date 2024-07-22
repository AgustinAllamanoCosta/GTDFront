import { useEffect } from 'react';
import { useTask } from '../../hooks/useTask';
import { TaskInformationContext } from '../../contexts/taskContext';
import {
  ItemsContextPorps,
  UserTaskData,
  UseTaskResponse,
} from '../../types/types';
import { userDataFactory } from '../../factories/UserDataFactory';

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
    const defaultUserData: UserTaskData = userDataFactory(
      defaultActiveItems,
      defaultCancelItems,
      defaultDoneItems,
      defaultItems,
    );
    useTaskfunctions.setUserTaskData(defaultUserData);
  }, []);

  return (
    <TaskInformationContext.Provider value={useTaskfunctions}>
      {children}
    </TaskInformationContext.Provider>
  );
};

export default ItemsContext;
