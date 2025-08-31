import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { fn } from "storybook/test";

import Checkbox from "../Checkbox";

const meta = {
  title: "Example/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onChange: fn() },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    label: "Я принимаю условия использования",
    checked: true,
    id: "accept-terms",
  },
};

export const Disabled: Story = {
  args: {
    label: "Я принимаю условия использования",
    checked: true,
    disabled: true,
    id: "accept-terms",
  },
};
export const Unchecked: Story = {
  args: {
    label: "Я принимаю условия использования",
    checked: false,
    id: "accept-terms",
  },
};
