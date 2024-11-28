import type { Meta, StoryObj } from '@storybook/react';
import TaskView from './Task';
import { PhoneContext } from '../../storybook/decorators/phone';
import { mockTaskInContext } from '../../storybook/decorators/tasks';

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
    environment: 'Locla',
    refreshTaskInterval: 900000,
    userData: {
      id: 'some user id',
      name: 'Test in storybook',
      photoURL: 'https://www.pngall.com/wp-content/uploads/5/Profile.png',
      accessToken: 'some access token',
    },
    inboxTasks: mockTaskInContext,
  },
};
