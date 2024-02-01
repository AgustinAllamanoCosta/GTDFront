import { useEffect, useState, useContext } from 'react';
import { ActiveTasks, InboxTasks, Task } from '../types/types';
import { ErrorHandlerContext } from '../contexts/errorHandlerContext';
import { UserInformationContext } from '../contexts/userContext';
import { repository } from '../repository/repository';
import { firebaseData } from '../hooks/useFirebase';

export const useTask = () => {
  const errorContext = useContext(ErrorHandlerContext);
  const userInformation = useContext(UserInformationContext);
  const { getData, save } = repository(
    userInformation.userData?.id ? userInformation.userData?.id : '',
    firebaseData.useFireBase,
  );

  const [activeItems, setActiveItems] = useState<ActiveTasks>([]);
  const [inboxTask, setInboxTask] = useState<InboxTasks>([]);

  const [items, setItems] = useState<InboxTasks>([]);

  const getTheActiveTask = (taskToAnalize: InboxTasks) => {
    const newActiveTask: Array<Task> = taskToAnalize.filter((task: Task) => {
      return task.isActive && !task.isCancele && !task.isComplete;
    });
    setActiveItems([...newActiveTask]);
  };

  const getInboxTask = (taskToAnalize: InboxTasks) => {
    const newInboxTask: Array<Task> = taskToAnalize.filter((task: Task) => {
      return !task.isActive && !task.isCancele && !task.isComplete;
    });
    setInboxTask([...newInboxTask]);
  };

  const loadTask = async () => {
    try {
      const dataFromLocalStorage = await getData();
      setItems(dataFromLocalStorage);
    } catch (error: any) {
      errorContext.setError(true);
      errorContext.setMessage(error.message);
    }
  };

  const processItems = async () => {
    if (items) {
      getTheActiveTask(items);
      getInboxTask(items);
    }
    if (items && items.length !== 0) await save(items);
  };

  useEffect(() => {
    try {
      processItems();
    } catch (error: any) {
      errorContext.setError(true);
      errorContext.setMessage(error.message);
    }
  }, [items]);

  return {
    activeItems,
    inboxTask,
    items,
    setActiveItems,
    setItems,
    setInboxTask,
    refreshData: loadTask,
  };
};
