import type { Meta, StoryObj } from '@storybook/react';
import { PhoneContext } from '../../storybook/decorators/phone';
import MainView from './Main';

const meta = {
  title: 'Views/Main',
  component: MainView,
  tags: ['autodocs'],
  decorators: [PhoneContext],
} satisfies Meta<typeof MainView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullMainView: Story = {
  args: {},
};
