import { ReactNode } from 'react';
import { useTask } from '../../hooks/useTask';
import { TaskInformationContext } from '../../contexts/taskContext';

const ItemsContext = ({ children }: { children: ReactNode }) => {
  const { activeItems, inboxTask, items, setActiveItems, setItems } = useTask();

  return (
    <TaskInformationContext.Provider
      value={{
        activeTasks: activeItems,
        inboxTasks: inboxTask,
        items,
        setActiveTask: setActiveItems,
        setItems,
      }}
    >
      {children}
    </TaskInformationContext.Provider>
  );
};

export default ItemsContext;
