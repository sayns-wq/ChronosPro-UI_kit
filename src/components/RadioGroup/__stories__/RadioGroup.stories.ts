import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { fn } from "storybook/test";

import RadioGroup from "../RadioGroup";

const meta = {
  title: "Example/RadioGroup",
  component: RadioGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onChange: fn() },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: "color",
    label: "Выберите цвет",
    value: "green",
    options: [
      { value: "red", label: "Красный" },
      { value: "green", label: "Зелёный" },
      { value: "blue", label: "Синий", disabled: true },
    ],
  },
};
