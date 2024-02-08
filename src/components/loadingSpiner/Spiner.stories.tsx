import type { Meta, StoryObj } from '@storybook/react';

import { Spiner } from './Spiner';

const meta = {
  title: 'Components/Spiner',
  component: Spiner,
  tags: ['autodocs'],
} satisfies Meta<typeof Spiner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SpinerLoadingInTheVoid: Story = {
  args: {},
};
