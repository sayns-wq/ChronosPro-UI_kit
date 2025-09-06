import React from "react";
import "./styles.scss";
import RadioButton from "../Radio/Radio";

interface RadioGroupProps {
  /**
   * Подпись группы
   */
  label: string;

  /**
   * Текущее выбранное значение
   */
  value: string | number;

  /**
   * Обработчик изменения
   */
  onChange: (value: string | number) => void;

  /**
   * Имя группы — используется как name для всех RadioButtons
   */
  name: string;

  /**
   * Неактивное состояние
   */
  disabled?: boolean;

  /**
   * Дополнительный класс
   */
  className?: string;

  /**
   * Ориентация : вертикальная / горизонтальная
   */
  orientation?: "vertical" | "horisontal";

  /**
   * Массив опций
   */
  options: {
    value: string | number;
    label: string;
    disabled?: boolean;
  }[];
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  label: legend,
  value,
  onChange,
  name,
  disabled: groupDisabled = false,
  orientation = "horisontal",
  className,
  options,
}: RadioGroupProps) => {
  return (
    <fieldset
      className={`ui-kit-radioGroup ${className}`}
      disabled={groupDisabled}
    >
      {legend && <legend className="ui-kit-radioGroup-legend">{legend}</legend>}
      <div
        className={`ui-kit-radioGroup-options ui-kit-radioGroup-options-${orientation}`}
      >
        {options.map((option) => (
          <RadioButton
            key={option.value}
            name={name}
            value={option.value}
            label={option.label}
            checked={value === option.value}
            onChange={onChange}
            disabled={option.disabled ?? groupDisabled}
            id={`${name}-radio-${option.value}`}
          />
        ))}
      </div>
    </fieldset>
  );
};

export default RadioGroup;
