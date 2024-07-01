import { Task } from '../../types/types';
import { BrowserRouter } from 'react-router-dom';
import ItemsContext from '../../components/useItems/useItems';
import { taskFactory } from '../../factories/TaskFactory';

export const task1: Task = taskFactory(true)('some task 1', 0, false);
export const task2: Task = taskFactory(true)('some task 2', 0, false);
export const task3: Task = taskFactory(true)('some task 3', 0, false);
export const task4: Task = taskFactory(true)('some task 4', 0, false);
export const task5: Task = taskFactory(true)('some task 5', 0, false);

export const mockTaskInContext: Map<string, Task> = new Map();
mockTaskInContext.set(task1.id, task1);
mockTaskInContext.set(task2.id, task2);
mockTaskInContext.set(task3.id, task3);
export const mockCancelTaskInContext: Map<string, Task> = new Map();
mockCancelTaskInContext.set(task4.id, task4);
export const mockDoneTaskInContext: Map<string, Task> = new Map();
mockDoneTaskInContext.set(task5.id, task5);

export const TaskContextDecorator = (Story: any) => {
  return (
    <BrowserRouter>
      <ItemsContext>
        <Story />
      </ItemsContext>
    </BrowserRouter>
  );
};
