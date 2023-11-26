import type { Meta, StoryObj } from '@storybook/react';

import LoginView from './Login';
import { PhoneContext } from '../../storybook/decorators/phone';

const meta = {
  title: 'Views/Login',
  component: LoginView,
  tags: ['autodocs'],
  decorators: [PhoneContext],
} satisfies Meta<typeof LoginView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullLoginView: Story = {
  args: {},
};
