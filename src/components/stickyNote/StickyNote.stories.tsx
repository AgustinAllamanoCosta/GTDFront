import type { Meta, StoryObj } from '@storybook/react';
import { THEME_ONE } from '../../constants/colors';

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
    backgroundColor: THEME_ONE.stickBackGround,
  },
};

export const StickyNoteWithLargeText: Story = {
  args: {
    number: '0',
    text: 'some large large large large large large large text',
    backgroundColor: THEME_ONE.stickBackGround,
  },
};
