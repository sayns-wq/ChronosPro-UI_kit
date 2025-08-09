import "./styles.scss";
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  primary?: boolean;
  label?: string;
  backgroundColor?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}
const Input: React.FC<InputProps> = ({ label, onChange, value, ...args }) => {
  return (
    <div className="input_wrapper">
      {label && (
        <label className="input_label" htmlFor={label}>
          {label}
        </label>
      )}
      <input
        className="input_style"
        placeholder="Type here"
        id={label}
        onChange={onChange}
        value={value}
        {...args}
      />
    </div>
  );
};

export default Input;
