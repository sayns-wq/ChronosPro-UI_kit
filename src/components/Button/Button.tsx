import Spinner from "../Spinner/Spinner";
import "./styles.scss";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  action?: () => unknown;
  size?: "xs" | "s" | "m" | "l" | "xl";
  backgroundColor?: string;
  isLoading?: boolean;
}
const Button: React.FC<ButtonProps> = ({
  text,
  action,
  size = "m",
  backgroundColor,
  isLoading = false,
  ...args
}) => {
  return (
    <button
      className="ui-kit-button"
      data-size={size}
      onClick={action}
      {...args}
    >
      {isLoading ? <Spinner size="xs" /> : text}
    </button>
  );
};

export default Button;
