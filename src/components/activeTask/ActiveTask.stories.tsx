import type { Meta, StoryObj } from '@storybook/react';

import { ActiveTask } from './ActiveTask';
import { TaskContextDecorator } from '../../storybook/decorators/tasks';

const meta = {
  title: 'Components/ActiveTaskList',
  component: ActiveTask,
  tags: ['autodocs'],
  decorators: [TaskContextDecorator],
} satisfies Meta<typeof ActiveTask>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ActiveTaskRenderInTheVoid: Story = {};
