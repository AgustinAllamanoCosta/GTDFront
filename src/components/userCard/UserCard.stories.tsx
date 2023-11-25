import type { Meta, StoryObj } from "@storybook/react";

import { UserCard } from "./UserCard";

const meta = {
  title: "Components/UserCard",
  component: UserCard,
  tags: ["autodocs"],
} satisfies Meta<typeof UserCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UserCardWithOutPhoto: Story = {
  args: {
    userName: "Agustin Allamano Costa",
    userPhoto: "https://i.stack.imgur.com/Dj7eP.jpg"
  },
};
