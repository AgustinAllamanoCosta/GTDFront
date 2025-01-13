import type { Meta, StoryObj } from '@storybook/react';

import { Toast } from './Toast';

const meta = {
  title: 'Components/Toast',
  component: Toast,
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

const message: React.JSX.Element = (
  <span>You need to complete an active task before active a new one</span>
);

export const ToastWithOneMessage: Story = {
  args: {
    children: [message],
    onClose: () => {},
  },
};
