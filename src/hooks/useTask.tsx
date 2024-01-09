import { useEffect, useState, useContext } from 'react';
import { ActiveTasks, InboxTasks, Task } from '../types/types';
import { doc, setDoc } from 'firebase/firestore';
import useFireBase from './useFirebase';
import { FIRE_BASE_COLLECTION_NAME } from '../constants /keys';
import { useLocalStorage } from './useLocalStorage';
import { ErrorHandlerContext } from '../contexts/errorHandlerContext';

export const useTask = (userTask: InboxTasks = []) => {
  const errorContext = useContext(ErrorHandlerContext);
  const { getItem, saveItems } = useLocalStorage();

  const [activeItems, setActiveItems] = useState<ActiveTasks>([]);
  const [inboxTask, setInboxTask] = useState<InboxTasks>([]);

  const [items, setItems] = useState<InboxTasks>(userTask);

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

  const saveIntoFirebase = async (items: InboxTasks) => {
    const userTask = doc(useFireBase, FIRE_BASE_COLLECTION_NAME, 'user-id');
    try {
      await setDoc(userTask, { items });
    } catch (error: any) {
      errorContext.setError(true);
      errorContext.setMessage(error.message);
    }
  };

  const save = async (items: InboxTasks) => {
    saveItems(items);
    await saveIntoFirebase(items);
  };

  useEffect(() => {
    try {
      getTheActiveTask(items);
      getInboxTask(items);
      if (items.length !== 0) {
        save(items);
      }
    } catch (error: any) {
      errorContext.setError(true);
      errorContext.setMessage(error.message);
    }
  }, [items]);

  useEffect(() => {
    try {
      if (items.length === 0) {
        const items = getItem();
        if (items) {
          setItems(items);
        }
      } else {
        save(items);
      }
    } catch (error: any) {
      errorContext.setError(true);
      errorContext.setMessage(error.message);
    }
  }, []);

  return {
    activeItems,
    inboxTask,
    items,
    setActiveItems,
    setItems,
    setInboxTask,
  };
};
