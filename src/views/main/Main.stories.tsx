import type { Meta, StoryObj } from '@storybook/react';
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
      {
        title: 'Some task 4',
        isComplete: false,
      },
      {
        title: 'Some task 5',
        isComplete: false,
      },

    ],
    userData: {
      name: 'Agustin Allamano Costa',
      photoURL: 'https://i.stack.imgur.com/Dj7eP.jpg',
    },
  },
};
