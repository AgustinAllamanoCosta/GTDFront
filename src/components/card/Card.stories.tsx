import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

const postItOne: React.JSX.Element = <span>post it one</span>;
const postItTwo: React.JSX.Element = <span>post it two</span>;
const postItThree: React.JSX.Element = <span>post it three</span>;

export const CardSecondaryWithChildren: Story = {
  args: {
    children: [postItOne, postItTwo, postItThree],
  },
};

export const CardWithContentCenter: Story = {
  args: {
    children: [postItOne, postItTwo, postItThree],
    content_center: true,
  },
};
