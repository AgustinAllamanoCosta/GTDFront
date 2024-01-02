import type { Meta, StoryObj } from '@storybook/react';

import { StickyNote } from './StickyNote';

const meta = {
  title: 'Components/StickyNote',
  component: StickyNote,
  tags: ['autodocs'],
} satisfies Meta<typeof StickyNote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StickyNoteWithText: Story = {
  args: {
    number: '0',
    text: 'some text',
  },
};

export const StickyNoteWithLargeText: Story = {
  args: {
    number: '0',
    text: 'some large large large large large large large text',
  },
};
