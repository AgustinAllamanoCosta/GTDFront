import type { Meta, StoryObj } from '@storybook/react';

import { ItemList } from './ItemList';
import { TaskContextDecorator } from '../../storybook/decorators/tasks';

const meta = {
  title: 'Components/ItemList',
  component: ItemList,
  tags: ['autodocs'],
  decorators: [TaskContextDecorator]
} satisfies Meta<typeof ItemList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ItemListInTheVoid: Story = {
  args: {
    title: 'Some title',
  },
};
