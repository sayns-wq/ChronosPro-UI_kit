import "./styles.scss";

interface ProgressBarProps {
  value: number;
  min?: number;
  max?: number;
  showValueLabel?: boolean;
  label?: string;
  variant?: "determinate" | "indeterminate";
  size?: "small" | "medium" | "large";
  /**
   * Включить автоматическое изменение цвета в зависимости от значения
   * @default true
   */
  autoColor?: boolean;
  className?: string;
}

const getPercent = (
  variant: string,
  value: number,
  min: number,
  max: number
) => {
  if (variant === "indeterminate") return 0;
  const clampedValue = Math.min(Math.max(value, min), max);
  return ((clampedValue - min) / (max - min)) * 100;
};

const getColor = (autoColor: boolean, percent: number) => {
  if (!autoColor) return "--standart"; // стандартный цвет

  if (percent < 30) return "--red"; // красный
  if (percent < 70) return "--yellow"; // жёлтый
  return "--green"; // зелёный
};

const ProgressBar = ({
  value,
  min = 0,
  max = 100,
  showValueLabel = false,
  label,
  variant = "determinate",
  size = "medium",
  autoColor = true,
  className = "",
}: ProgressBarProps) => {
  const percent = getPercent(variant, value, min, max);
  const barColor = getColor(autoColor, percent);
  return (
    <div className={`ui-kit-ProgressbarWrapper ${className}`}>
      {label && <div className="ui-kit-ProgressbarLabel">{label}</div>}

      <div
        role={variant === "indeterminate" ? "progressbar" : "progressbar"}
        aria-valuenow={variant === "determinate" ? value : undefined}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label || "Progress bar"}
        className={`ui-kit-progressbar ui-kit-progressbar--${size}`}
      >
        {variant === "indeterminate" ? (
          <div className="ui-kit-progressbarTrack">
            <div
              className={`ui-kit-progressbarIndeterminate ui-kit-progressbarIndeterminate${barColor}`}
            />
          </div>
        ) : (
          <div className="ui-kit-progressbarTrack">
            <div
              className={`ui-kit-progressbarFill ui-kit-progressbarFill${barColor}`}
              style={{ width: `${percent}%` }}
            />
            {showValueLabel && (
              <div
                className={`ui-kit-progressbarValueLabel ui-kit-progressbarValueLabel${barColor}`}
              >
                {Math.round(percent)}%
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
