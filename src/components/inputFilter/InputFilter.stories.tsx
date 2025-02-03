import type { Meta, StoryObj } from '@storybook/react';

import { InputFilter } from './InputFilter';

const meta = {
  title: 'Components/InputFilter',
  component: InputFilter,
  tags: ['autodocs'],
} satisfies Meta<typeof InputFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InputFilterOnly: Story = {
  args: {
    onKeyDown: (e) => {},
  },
};
