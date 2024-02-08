import type { Meta, StoryObj } from '@storybook/react';
import { TaskContextDecorator } from '../../storybook/decorators/tasks';
import CancelList from './CancelList';

const meta = {
  title: 'Components/ItemList',
  component: CancelList,
  tags: ['autodocs'],
  decorators: [TaskContextDecorator],
} satisfies Meta<typeof CancelList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CancelListInTheVoid: Story = {
  args: {},
};
