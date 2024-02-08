import type { Meta, StoryObj } from '@storybook/react';
import { TaskContextDecorator } from '../../storybook/decorators/tasks';
import ItemList from './ItemList';

const meta = {
  title: 'Components/ItemList',
  component: ItemList,
  tags: ['autodocs'],
  decorators: [TaskContextDecorator],
} satisfies Meta<typeof ItemList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ItemListInTheVoid: Story = {
  args: {},
};
