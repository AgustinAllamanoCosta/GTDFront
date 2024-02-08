import type { Meta, StoryObj } from '@storybook/react';
import { TaskContextDecorator } from '../../storybook/decorators/tasks';
import DoneList from './DoneList';

const meta = {
  title: 'Components/DoneList',
  component: DoneList,
  tags: ['autodocs'],
  decorators: [TaskContextDecorator],
} satisfies Meta<typeof DoneList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ItemListInTheVoid: Story = {
  args: {},
};
