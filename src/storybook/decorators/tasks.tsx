import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../types/types';
import { BrowserRouter } from 'react-router-dom';
import ItemsContext from '../../components/useItems/useItems';

export const task1: Task = {
  title: 'some task 1',
  id: uuidv4(),
  creationDate: '',
};
export const task2: Task = {
  title: 'some task 2',
  id: uuidv4(),
  creationDate: '',
};
export const task3: Task = {
  title: 'some task 3',
  id: uuidv4(),
  creationDate: '',
};
export const task4: Task = {
  title: 'some task 4',
  id: uuidv4(),
  creationDate: '',
};
export const task5: Task = {
  title: 'some task 5',
  id: uuidv4(),
  creationDate: '',
};

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
