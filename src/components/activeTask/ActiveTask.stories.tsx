import type { Meta, StoryObj } from '@storybook/react';

import { ActiveTask } from './ActiveTask';
import { Task } from '../../views/main/Main';

const meta = {
  title: 'Components/ActiveTaskList',
  component: ActiveTask,
  tags: ['autodocs'],
} satisfies Meta<typeof ActiveTask>;

export default meta;
type Story = StoryObj<typeof meta>;

const task1: Task = {
  title: 'some task 1',
  isComplete: false,
};
const task2: Task = {
  title: 'some task 2',
  isComplete: false,
};
const task3: Task = {
  title: 'some task 3',
  isComplete: false,
};

export const ActiveTaskRenderInTheVoid: Story = {
  args: {
    task_list: [task1, task2, task3],
  },
};
