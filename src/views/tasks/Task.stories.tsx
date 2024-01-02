import type { Meta, StoryObj } from '@storybook/react';
import TaskView from './Task';
import { v4 as uuidv4 } from 'uuid';

const meta = {
  title: 'Views/Task',
  component: TaskView,
  tags: ['autodocs'],
} satisfies Meta<typeof TaskView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullTaskView: Story = {
  args: {
    activeTasks: [],
    inboxTasks: [
      {
        id: uuidv4(),
        title: 'Some task 1',
        isComplete: false,
        isActive: false,
        isCancele: false,
      },
      {
        id: uuidv4(),
        title: 'Some task 2',
        isComplete: false,
        isActive: false,
        isCancele: false,
      },
      {
        id: uuidv4(),
        title: 'Some task 3',
        isComplete: false,
        isActive: false,
        isCancele: false,
      },
      {
        id: uuidv4(),
        title: 'Some task 4',
        isComplete: false,
        isActive: false,
        isCancele: false,
      },
      {
        id: uuidv4(),
        title: 'Some task 5',
        isComplete: false,
        isActive: false,
        isCancele: false,
      },
    ],
    userData: {
      id: '12312312312312312',
      name: 'Agustin Allamano Costa',
      photoURL: 'https://i.stack.imgur.com/Dj7eP.jpg',
      accessToken: 'some acess token',
    },
  },
};
