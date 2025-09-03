import type { Meta, StoryObj } from "@storybook/react-webpack5";

import TextArea from "../TextArea";

const meta = {
  title: "Example/TextArea",
  component: TextArea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "TextAreaComponent",
    placeholder: "Введите текст",
  },
};
