import type { Meta, StoryObj } from '@storybook/react';
import TaskView from './Task';
import { v4 as uuidv4 } from 'uuid';
import { PhoneContext } from '../../storybook/decorators/phone';

const meta = {
  title: 'Views/Task',
  component: TaskView,
  tags: ['autodocs'],
  decorators: [PhoneContext],
} satisfies Meta<typeof TaskView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullTaskView: Story = {
  args: {
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
  },
};
