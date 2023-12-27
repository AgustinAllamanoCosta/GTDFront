import { useEffect, useState } from 'react';
import { ActiveTasks, InboxTasks, Task } from '../types/types';

export const useTask = (userTask: InboxTasks) => {
  const LOCAL_HOST_KEY: string = 'gtd-data';
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

  useEffect(() => {
    getTheActiveTask(items);
    getInboxTask(items);
    if (items.length !== 0) {
      saveItems(items);
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
