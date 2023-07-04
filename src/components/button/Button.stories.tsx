import type { Meta, StoryObj } from "@storybook/react";
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import { Button } from "./Button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ButtonInTheVoid: Story = {
  args: {
    text: 'Some Button',
    onClick: (e:any) => { console.log(e); }
  },
};

export const ButtonInTheVoidWithIcon: Story = {
  args: {
    text: 'Some Button',
    icon: faPlus,
    onClick: (e:any) => { console.log(e); }
  },
};
