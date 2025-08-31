import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { fn } from "storybook/test";

import Radio from "../Radio";

const meta = {
  title: "Example/Radio",
  component: Radio,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onChange: fn() },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Checked: Story = {
  args: {
    label: "Я принимаю условия использования",
    checked: true,
    id: "accept-terms",
    value: 1,
    name: "radio",
  },
};

export const Unchecked: Story = {
  args: {
    label: "Я принимаю условия использования",
    checked: false,
    id: "accept-terms",
    value: 1,
    name: "radio",
  },
};
export const Disabled: Story = {
  args: {
    label: "Я принимаю условия использования",
    checked: false,
    disabled: true,
    id: "accept-terms",
    value: 1,
    name: "radio",
  },
};
