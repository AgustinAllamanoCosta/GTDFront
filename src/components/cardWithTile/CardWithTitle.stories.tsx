import type { Meta, StoryObj } from '@storybook/react';

import { CardTitle } from './CardWithTitle';

const meta = {
  title: 'Components/CardTitle',
  component: CardTitle,
  tags: ['autodocs'],
} satisfies Meta<typeof CardTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

const postItOne: JSX.Element = <span>post it one</span>;
const postItTwo: JSX.Element = <span>post it two</span>;
const postItThree: JSX.Element = <span>post it three</span>;

export const CardWithTitle: Story = {
  args: {
    title: "Some title",
    label: "some label",
    children: [postItOne, postItTwo, postItThree],
  },
};