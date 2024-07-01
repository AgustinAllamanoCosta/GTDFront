import type { Meta, StoryObj } from '@storybook/react';

import { Spinner } from './Spiner';

const meta = {
  title: 'Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SpinnerLoadingInTheVoid: Story = {
  args: {},
};
