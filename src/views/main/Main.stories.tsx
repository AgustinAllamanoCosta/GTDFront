import type { Meta, StoryObj } from '@storybook/react';
import { PhoneContext } from '../../storybook/decorators/phone';
import MainView from './Main';

const meta = {
  title: 'Views/Main',
  component: MainView,
  tags: ['autodocs'],
} satisfies Meta<typeof MainView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullMainView: Story = {
  args: {
    activeTasks: [
      {
        title: 'Some task 1',
        isComplete: false,
      },
      {
        title: 'Some task 2',
        isComplete: false,
      },
      {
        title: 'Some task 3',
        isComplete: false,
      },
    ],
    inboxTasks: [
      {
        title: 'Some task 1',
        isComplete: false,
      },
      {
        title: 'Some task 2',
        isComplete: false,
      },
      {
        title: 'Some task 3',
        isComplete: false,
      },
    ],
  },
};
