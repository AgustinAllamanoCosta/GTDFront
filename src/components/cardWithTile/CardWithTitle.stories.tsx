import type { Meta, StoryObj } from '@storybook/react';

import { CardWithTitle } from './CardWithTitle';

const meta = {
  title: 'Components/CardTitle',
  component: CardWithTitle,
  tags: ['autodocs'],
} satisfies Meta<typeof CardWithTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

const postItOne: React.JSX.Element = <span>post it one</span>;
const postItTwo: React.JSX.Element = <span>post it two</span>;
const postItThree: React.JSX.Element = <span>post it three</span>;

export const CardWithTitleStory: Story = {
  args: {
    title: 'Some title',
    label: 'some label',
    children: [postItOne, postItTwo, postItThree],
  },
};

export const CardWithTitleAndTagJoin: Story = {
  args: {
    title: 'Some title',
    label: 'some label',
    children: [postItOne, postItTwo, postItThree],
    joinTag: true,
  },
};
