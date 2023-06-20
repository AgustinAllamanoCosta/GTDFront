import type { Meta, StoryObj } from '@storybook/react';

import { Card } from './Card';

const meta = {
  title: 'Card',
  component: Card,
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardWithTitle: Story = {
  args: {
    title: "Get Thing Done",
    subTitle: "",
  },
};

export const CardWithSubtitle: Story = {
  args: {
    title: "",
    subTitle: "Es momento de",
  },
};

export const CardWithTitleAndSubTitle: Story = {
  args: {
    title: "Get Thing Done",
    subTitle: "Es momento de",
  },
};
