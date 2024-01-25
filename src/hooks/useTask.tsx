import { useEffect, useState, useContext } from 'react';
import { ActiveTasks, InboxTasks, Task } from '../types/types';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import useFireBase from './useFirebase';
import { FIRE_BASE_COLLECTION_NAME } from '../constants/keys';
import { useLocalStorage } from './useLocalStorage';
import { ErrorHandlerContext } from '../contexts/errorHandlerContext';
import { UserInformationContext } from '../contexts/userContext';

const repository = () => {
  const userDataContext = useContext(UserInformationContext);
  const { getItem, saveItems } = useLocalStorage();

  const saveIntoFirebase = async (items: InboxTasks) => {
    if (userDataContext.userData?.id) {
      const userTask = doc(
        useFireBase,
        FIRE_BASE_COLLECTION_NAME,
        userDataContext.userData?.id,
      );
      await setDoc(userTask, { items });
    }
  };

  const save = async (items: InboxTasks) => {
    saveItems(items);
    await saveIntoFirebase(items);
  };

  const getData = async () => {
    let data = await getDataFromFirebase();
    if (!data) data = getItem();
    return data;
  };

  const getDataFromFirebase = async () => {
    let items = [];
    if (userDataContext.userData?.id) {
      const userTaskDoc = doc(
        useFireBase,
        FIRE_BASE_COLLECTION_NAME,
        userDataContext.userData.id,
      );
      const itemsInFirebase = await getDoc(userTaskDoc);
      const userData = itemsInFirebase.data();
      items = userData?.items ? userData?.items : [];
    }
    return items;
  };

  return {
    save,
    getData,
  };
};

export const useTask = () => {
  const errorContext = useContext(ErrorHandlerContext);
  const { getData, save } = repository();

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
