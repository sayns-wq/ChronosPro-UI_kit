import type { Meta, StoryObj } from "@storybook/react-webpack5";

import List from "../List";

const meta = {
  title: "Example/List",
  component: List,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    listItems: [1, 2, 3, [5, [6, 7]], 4, [3, 4]],
  },
};
