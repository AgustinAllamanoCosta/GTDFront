import { useEffect, useState, useContext } from 'react';
import { ActiveTasks, InboxTasks, Task } from '../types/types';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import useFireBase from './useFirebase';
import { FIRE_BASE_COLLECTION_NAME } from '../constants/keys';
import { useLocalStorage } from './useLocalStorage';
import { ErrorHandlerContext } from '../contexts/errorHandlerContext';
import { UserInformationContext } from '../contexts/userContext';

export const useTask = () => {
  const errorContext = useContext(ErrorHandlerContext);
  const userDataContext = useContext(UserInformationContext);
  const { getItem, saveItems } = useLocalStorage();

  const [activeItems, setActiveItems] = useState<ActiveTasks>([]);
  const [inboxTask, setInboxTask] = useState<InboxTasks>([]);

  const [items, setItems] = useState<InboxTasks>([]);
  const [isOnline, setIsOnline] = useState<boolean>(true);

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
    try {
      if (userDataContext.userData?.id) {
        const userTask = doc(
          useFireBase,
          FIRE_BASE_COLLECTION_NAME,
          userDataContext.userData?.id,
        );

        await setDoc(userTask, { items });
      }
    } catch (error: any) {
      errorContext.setError(true);
      errorContext.setMessage(error.message);
    }
  };

  const save = async (items: InboxTasks) => {
    saveItems(items);
    if (isOnline) await saveIntoFirebase(items);
  };

  const getDataFromFirebase = async () => {
    if (userDataContext.userData?.id) {
      const userTaskDoc = doc(
        useFireBase,
        FIRE_BASE_COLLECTION_NAME,
        userDataContext.userData.id,
      );
      const itemsInFirebase = await getDoc(userTaskDoc);
      const userData = itemsInFirebase.data();
      if (userData) setItems(userData.items);
    }
  };

  const loadTask = async () => {
    try {
      const dataFromLocalStorage = getItem();
      if (isOnline) {
        if (dataFromLocalStorage) setItems(dataFromLocalStorage);
        else await getDataFromFirebase();
      } else {
        if (dataFromLocalStorage) setItems(dataFromLocalStorage);
        else throw Error('No data in local storage');
      }
    } catch (error: any) {
      errorContext.setError(true);
      errorContext.setMessage(error.message);
    }
  };

  useEffect(() => {
    try {
      if (items) {
        getTheActiveTask(items);
        getInboxTask(items);
      }
      if (items && items.length !== 0) save(items);
    } catch (error: any) {
      errorContext.setError(true);
      errorContext.setMessage(error.message);
    }
  }, [items]);

  useEffect(() => {
    const handlerOffline = () => setIsOnline(false);
    const handlerOnline = () => setIsOnline(false);
    window.addEventListener('offline', handlerOffline);
    window.addEventListener('online', handlerOnline);
    return () => {
      window.removeEventListener('offline', handlerOffline);
      window.removeEventListener('online', handlerOnline);
    };
  }, []);

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
