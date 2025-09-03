import "./styles.scss";
interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  primary?: boolean;
  label?: string;
  backgroundColor?: any;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}
const TextArea: React.FC<TextAreaProps> = ({
  label,
  placeholder,
  onChange,
  value,
  rows,
  cols,
  ...args
}) => {
  return (
    <div className="ui-kit-textArea_wrapper">
      {label && (
        <label className="ui-kit-textArea_label" htmlFor={label}>
          {label}
        </label>
      )}
      <textarea
        className="ui-kit-textArea_style"
        placeholder={placeholder}
        id={label}
        onChange={onChange}
        rows={rows}
        cols={cols}
        value={value}
        {...args}
      />
    </div>
  );
};

export default TextArea;
