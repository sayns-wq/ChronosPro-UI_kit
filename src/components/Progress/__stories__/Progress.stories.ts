import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { fn } from "storybook/test";

import ProgressBar from "../Progress";

const meta = {
  title: "Example/ProgressBar",
  component: ProgressBar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Progress10: Story = {
  args: {
    label: "Проценты",
    value: 10,
    showValueLabel: true,
  },
};
export const Progress30: Story = {
  args: {
    label: "Проценты",
    value: 30,
    showValueLabel: true,
  },
};
export const Progress50: Story = {
  args: {
    label: "Проценты",
    value: 50,
  },
};
export const Progress80: Story = {
  args: {
    label: "Проценты",
    value: 80,
  },
};
export const Progress100: Story = {
  args: {
    label: "Проценты",
    value: 100,
  },
};
