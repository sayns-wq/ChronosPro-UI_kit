import type { Meta, StoryObj } from "@storybook/react-webpack5";

import { fn } from "storybook/test";

import Pagination from "../Pagination";

const meta = {
  title: "Example/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SimpleSelect: Story = {
  args: {
    currentPage: 1,
    totalItems: 40,
    onPageChange: () => null,
  },
};
