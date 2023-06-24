import type { Meta, StoryObj } from "@storybook/react";

import { Card } from "./Card";

const meta = {
  title: "Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CardWithTitlePrimary: Story = {
  args: {
    title: "Get Thing Done",
    subTitle: "Soy un subtitulo",
    primary: true
  },
};

export const CardWithTitleSecondary: Story = {
  args: {
    title: "Get Thing Done",
    subTitle: "Soy un subtitulo",
    primary: false
  },
};

const label: JSX.Element = <span>Some Label</span>;

export const CardWithTitleSecondaryWithLabel: Story = {
  args: {
    title: "Get Thing Done",
    subTitle: "Soy un subtitulo",
    primary: false,
    label: label
  },
};

const postItOne: JSX.Element = <span>post it one</span>;
const postItTwo: JSX.Element = <span>post it two</span>;
const postItThree: JSX.Element = <span>post it three</span>;

export const CardSecondaryWithChilds: Story = {
  args: {
    title: "Get Thing Done",
    subTitle: "Soy un subtitulo",
    primary: false,
    children: [postItOne, postItTwo, postItThree]
  },
};

export const CardSecondaryWithChildsAndWithOutHeader: Story = {
  args: {
    primary: false,
    children: [postItOne, postItTwo, postItThree]
  },
};
