import { useEffect, useState } from 'react';
import { ActiveTasks, InboxTasks, Task } from '../types/types';
import { doc, setDoc } from 'firebase/firestore';
import useFireBase from './useFirebase';

export const useTask = (userTask: InboxTasks) => {
  const LOCAL_HOST_KEY: string = 'gtd-data';
  const FIRE_BASE_COLLECTION_NAME: string = 'users-task';
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

  const saveItems = (items: InboxTasks) => {
    localStorage.setItem(
      LOCAL_HOST_KEY,
      JSON.stringify({
        items,
      }),
    );
  };

  const saveIntoFirebase = async (items: InboxTasks) => {
    const userTask = doc(useFireBase, FIRE_BASE_COLLECTION_NAME, 'user-id');
    try {
      const firebaseResponse = await setDoc(userTask, { items });
      console.log(firebaseResponse);
    } catch (error) {
      console.log('firebase error', error);
    }
  };

  useEffect(() => {
    getTheActiveTask(items);
    getInboxTask(items);
    if (items.length !== 0) {
      saveItems(items);
      saveIntoFirebase(items);
    }
  }, [items]);

  useEffect(() => {
    if (items.length === 0) {
      const gtd_data = localStorage.getItem(LOCAL_HOST_KEY);
      if (gtd_data) {
        const gtd_data_pars = JSON.parse(gtd_data);
        setItems(gtd_data_pars.items);
      }
    } else {
      saveItems(items);
      saveIntoFirebase(items);
    }
  }, []);

  return {
    activeItems,
    inboxTask,
    items,
    setActiveItems,
    setItems,
  };
};
