import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { fn } from "storybook/test";

import Select from "../Select";

const meta = {
  title: "Example/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: { onChange: fn() },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleSelect: Story = {
  args: {
    options: [
      { value: "1", label: "Яблоко" },
      { value: "2", label: "Апельсин" },
    ],
    value: "1",
  },
};
export const MultipleSelect: Story = {
  args: {
    options: [
      { value: "1", label: "Яблоко" },
      { value: "2", label: "Апельсин" },
    ],
    value: "1",
    multiple: true,
    placeholder: "Выберите фрукты...",
  },
};
export const LookforSelect: Story = {
  args: {
    options: [
      { value: "1", label: "Яблоко" },
      { value: "2", label: "Апельсин" },
    ],
    value: "1",
    searchable: true,
    placeholder: "Выберите фрукты...",
  },
};
export const LookforMultipleSelect: Story = {
  args: {
    options: [
      { value: "1", label: "Яблоко" },
      { value: "2", label: "Апельсин" },
    ],
    value: ["1", "2"],
    searchable: true,
    multiple: true,
    placeholder: "Выберите фрукты...",
  },
};
