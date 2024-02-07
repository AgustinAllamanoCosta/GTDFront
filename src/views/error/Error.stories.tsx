import type { Meta, StoryObj } from '@storybook/react';
import { PhoneContext } from '../../storybook/decorators/phone';
import ErrorView from './Error';

const meta = {
  title: 'Views/Error',
  component: ErrorView,
  tags: ['autodocs'],
  decorators: [PhoneContext],
} satisfies Meta<typeof ErrorView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullErrorView: Story = {
  args: {},
};
