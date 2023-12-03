import type { Meta, StoryObj } from '@storybook/react';

import { ItemList, Task } from './ItemList';

const meta = {
  title: 'Components/ItemList',
  component: ItemList,
  tags: ['autodocs'],
} satisfies Meta<typeof ItemList>;

export default meta;
type Story = StoryObj<typeof meta>;

const task: Task = {
  title: "some title",
  isComplete: false
}

export const ItemListInTheVoid: Story = {
  args: {
    title: "Some title",
    items: [task],
  },
};