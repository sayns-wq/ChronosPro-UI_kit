import React, { forwardRef, ForwardedRef } from "react";
import "./styles.scss"; // подключим стили

interface CheckboxProps {
  /**
   * Текст подписи
   */
  label: string;

  /**
   * Состояние чекбокса
   */
  checked: boolean;

  /**
   * Обработчик изменения состояния
   */
  onChange: (checked: boolean) => void;

  /**
   * Неактивное состояние
   */
  disabled?: boolean;

  /**
   * Уникальный id (для связи с label)
   */
  id?: string;

  /**
   * Значение (например, для форм)
   */
  value?: string;

  /**
   * Имя поля (для форм)
   */
  name?: string;

  /**
   * Дополнительный класс
   */
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      checked,
      onChange,
      disabled = false,
      id,
      value,
      name,
      className = "",
    }: CheckboxProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.checked);
    };

    const componentId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div
        className={`checkbox-wrapper ${
          disabled ? "checkbox-disabled" : ""
        } ${className}`}
      >
        <input
          ref={ref}
          type="checkbox"
          id={componentId}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className="checkbox-input"
        />
        <label htmlFor={componentId} className="checkbox-label">
          <span
            className={`checkbox-box ${checked ? "checked" : ""} ${
              disabled ? "disabled" : ""
            }`}
          >
            {checked && (
              <svg
                className="checkbox-check"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="5,10 8,13 15,6" />
              </svg>
            )}
          </span>
          <span className="checkbox-text">{label}</span>
        </label>
      </div>
    );
  }
);

export default Checkbox;
