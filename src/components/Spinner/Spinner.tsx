import "./styles.scss";
import spinner from "./svg/spinner.svg";
interface SpinnerProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: "xs" | "s" | "m" | "l" | "xl";
  color?: string;
}
const Spinner: React.FC<SpinnerProps> = ({
  size = "m",
  color = "#9e3bf8",
  ...args
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
      className="ui-kit-spinner"
      data-size={size}
      style={{ "--spinner-color": color } as React.CSSProperties}
    >
      <defs>
        <radialGradient
          id="a4"
          cx=".66"
          fx=".66"
          cy=".3125"
          fy=".3125"
          gradientTransform="scale(1.5)"
        >
          <stop offset="0" stop-color="var(--spinner-color)"></stop>
          <stop
            offset=".3"
            stop-color="var(--spinner-color)"
            stop-opacity=".9"
          ></stop>
          <stop
            offset=".6"
            stop-color="var(--spinner-color)"
            stop-opacity=".6"
          ></stop>
          <stop
            offset=".8"
            stop-color="var(--spinner-color)"
            stop-opacity=".3"
          ></stop>
          <stop
            offset="1"
            stop-color="var(--spinner-color)"
            stop-opacity="0"
          ></stop>
        </radialGradient>
      </defs>
      <circle
        transform-origin="center"
        fill="none"
        stroke="url(#a4)"
        stroke-width="15"
        stroke-linecap="round"
        stroke-dasharray="200 1000"
        stroke-dashoffset="0"
        cx="100"
        cy="100"
        r="70"
      >
        <animateTransform
          type="rotate"
          attributeName="transform"
          calcMode="spline"
          dur="2s"
          values="360;0"
          keyTimes="0;1"
          keySplines="0 0 1 1"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        transform-origin="center"
        fill="none"
        opacity=".2"
        stroke="var(--spinner-color)"
        stroke-width="15"
        stroke-linecap="round"
        cx="100"
        cy="100"
        r="70"
      />
    </svg>
  );
};

export default Spinner;
