import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { fn } from "storybook/test";

import Button from "../Button";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
    isLoading: { control: "boolean" },
    size: { control: "select", options: ["xs", "s", "m", "l", "xl"] },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    text: "Button",
  },
};
export const Loading: Story = {
  args: {
    text: "Button",
    isLoading: true,
  },
};
