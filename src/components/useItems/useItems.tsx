import { ReactNode, useEffect, useMemo } from 'react';
import { useTask } from '../../hooks/useTask';
import { TaskInformationContext } from '../../contexts/taskContext';
import { Task } from '../../types/types';

const ItemsContext = ({
  defaultItems,
  defaultActiveItems,
  children,
}: {
  defaultItems?: Array<Task>;
  defaultActiveItems?: Array<Task>;
  children: ReactNode;
}) => {
  const {
    activeItems,
    inboxTask,
    items,
    setActiveItems,
    setItems,
    setInboxTask,
    refreshData,
  } = useTask();

  const taskInfoContextValue = useMemo(
    () => ({
      activeTasks: activeItems,
      inboxTasks: inboxTask,
      items,
      setActiveTask: setActiveItems,
      setItems,
      refreshData: refreshData,
    }),
    [items, inboxTask, activeItems],
  );
  useEffect(() => {
    if (defaultActiveItems) setActiveItems(defaultActiveItems);
    if (defaultItems) setInboxTask(defaultItems);
  }, []);

  return (
    <TaskInformationContext.Provider value={taskInfoContextValue}>
      {children}
    </TaskInformationContext.Provider>
  );
};

export default ItemsContext;
