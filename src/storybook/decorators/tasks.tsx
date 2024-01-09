import { v4 as uuidv4 } from 'uuid';
import { Task } from '../../types/types';
import { BrowserRouter } from 'react-router-dom';
import ItemsContext from '../../components/useItems/useItems';

const task1: Task = {
  title: 'some task 1',
  isComplete: false,
  id: uuidv4(),
  isCancele: false,
  isActive: true,
};
const task2: Task = {
  title: 'some task 2',
  isComplete: false,
  id: uuidv4(),
  isCancele: false,
  isActive: true,
};
const task3: Task = {
  title: 'some task 3',
  isComplete: false,
  id: uuidv4(),
  isCancele: false,
  isActive: true,
};

export const mockTaskInContext: Array<Task> = [task1, task2, task3];

export const TaskContextDecorator = (Story: any) => {
  return (
    <BrowserRouter>
      <ItemsContext>
        <Story />
      </ItemsContext>
    </BrowserRouter>
  );
};
