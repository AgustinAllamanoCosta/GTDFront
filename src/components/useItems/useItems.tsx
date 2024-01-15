import { ReactNode, useEffect } from 'react';
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
  } = useTask(defaultItems);

  useEffect(() => {
    if (defaultActiveItems) setActiveItems(defaultActiveItems);
    if (defaultItems) setInboxTask(defaultItems);
  }, []);

  return (
    <TaskInformationContext.Provider
      value={{
        activeTasks: activeItems,
        inboxTasks: inboxTask,
        items,
        setActiveTask: setActiveItems,
        setItems,
        refreshData,
      }}
    >
      {children}
    </TaskInformationContext.Provider>
  );
};

export default ItemsContext;
