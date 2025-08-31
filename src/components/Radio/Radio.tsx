import React, { forwardRef, ForwardedRef } from "react";
import "./styles.scss";

interface RadioButtonProps {
  /**
   * Текст подписи
   */
  label: string;

  /**
   * Значение радио-кнопки (обычно строка или число)
   */
  value: string | number;

  /**
   * Текущее выбранное значение (из родительского состояния)
   */
  checked: boolean;

  /**
   * Обработчик изменения
   */
  onChange: (value: string | number) => void;

  /**
   * Имя группы — все радио с одинаковым name образуют группу
   */
  name: string;

  /**
   * Неактивное состояние
   */
  disabled?: boolean;

  /**
   * Уникальный id (опционально, будет сгенерирован)
   */
  id?: string;

  /**
   * Дополнительный класс
   */
  className?: string;
}

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>(
  (
    {
      label,
      value,
      checked,
      onChange,
      name,
      disabled = false,
      id,
      className = "",
    }: RadioButtonProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const handleChange = () => {
      onChange(value);
    };

    const componentId = id || `${name}-radio-${value}`;

    return (
      <div
        className={`radio-wrapper ${
          disabled ? "radio-disabled" : ""
        } ${className}`}
      >
        <input
          ref={ref}
          type="radio"
          id={componentId}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="radio-input"
        />
        <label htmlFor={componentId} className="radio-label">
          <span
            className={`radio-circle ${checked ? "checked" : ""} ${
              disabled ? "disabled" : ""
            }`}
          >
            {checked && <span className="radio-dot" />}
          </span>
          <span className="radio-text">{label}</span>
        </label>
      </div>
    );
  }
);

export default RadioButton;
