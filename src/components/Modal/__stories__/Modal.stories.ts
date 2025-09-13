import type { Meta, StoryObj } from "@storybook/react-webpack5";
import Modal from "../Modal";

const meta = {
  title: "Example/Modal",
  component: Modal,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    open: { control: "boolean" },
    onClose: { action: "onClose" },
    title: { control: "text" },
    showCloseButton: { control: "boolean" },
    closeOnBackdropClick: { control: "boolean" },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    open: true,
    onClose: () => console.log("Modal closed"),
    title: "Модальное окно",
    showCloseButton: true,
    closeOnBackdropClick: true,
  },
};
