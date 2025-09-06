// Select.tsx
import React, { useState, useRef, useEffect } from "react";
import "./styles.scss";

export interface SelectOption {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string | number | (string | number)[];
  onChange: (value: string | number | (string | number)[]) => void;
  placeholder?: string;
  multiple?: boolean;
  searchable?: boolean;
  disabled?: boolean;
  className?: string;
  noOptionsMessage?: (filter: string) => string;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = "Выберите...",
  multiple = false,
  searchable = false,
  disabled = false,
  className = "",
  noOptionsMessage = (filter) => `Нет вариантов для "${filter}"`,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = filter
    ? options.filter((opt) =>
        opt.label.toLowerCase().includes(filter.toLowerCase())
      )
    : options;

  const handleOptionClick = (option: SelectOption) => {
    if (disabled) return;

    if (multiple && Array.isArray(value)) {
      const isSelected = value.includes(option.value);
      const newValue = isSelected
        ? value.filter((v) => v !== option.value)
        : [...value, option.value];
      onChange(newValue);
    } else if (!multiple) {
      onChange(option.value);
      setIsOpen(false);
      setFilter("");
    }
  };

  const toggleOpen = () => {
    if (!disabled && (!searchable || multiple)) {
      setIsOpen((prev) => !prev);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      )
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  useEffect(() => {
    if (!isOpen) setFocusedIndex(-1);
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === "ArrowDown" || e.key === "ArrowUp") {
          e.preventDefault();
          setIsOpen(true);
        } else if (e.key === " ") {
          e.preventDefault();
          toggleOpen();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusedIndex((prev) =>
            prev < filteredOptions.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case "Enter":
          e.preventDefault();
          if (focusedIndex >= 0) {
            handleOptionClick(filteredOptions[focusedIndex]);
          }
          break;
        case "Escape":
          e.preventDefault();
          setIsOpen(false);
          setFilter("");
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, focusedIndex, filteredOptions]);

  const getSelectedLabels = () => {
    if (!multiple) {
      const selected = options.find((opt) => opt.value === value);
      return selected ? selected.label : "";
    }
    if (Array.isArray(value)) {
      return options
        .filter((opt) => value.includes(opt.value))
        .map((opt) => opt.label);
    }
    return [];
  };

  const selectedLabels = Array.isArray(getSelectedLabels())
    ? getSelectedLabels()
    : [getSelectedLabels()];

  return (
    <div
      className={`ui-kit-selectWrapper ${className} ${
        isOpen ? "ui-kit-open" : ""
      } ${disabled ? "ui-kit-disabled" : ""} ${
        multiple ? "ui-kit-multiple" : ""
      }`}
      ref={wrapperRef}
      tabIndex={disabled ? -1 : 0}
      onClick={toggleOpen}
      aria-expanded={isOpen}
      aria-disabled={disabled}
    >
      <div className="ui-kit-header">
        {multiple ? (
          <div className="ui-kit-tags">
            {Array.isArray(selectedLabels) && selectedLabels.length > 0 ? (
              selectedLabels.map((label) => (
                <span
                  key={Array.isArray(label) ? label[0] : label}
                  className="ui-kit-tag"
                >
                  {label}
                </span>
              ))
            ) : (
              <span className="ui-kit-placeholder">{placeholder}</span>
            )}
          </div>
        ) : (
          <span className={selectedLabels[0] ? "" : "ui-kit-placeholder"}>
            {selectedLabels[0] || placeholder}
          </span>
        )}

        <span className={`ui-kit-arrow ${isOpen ? "ui-kit-rotate" : ""}`} />
      </div>

      {isOpen && (
        <div className="ui-kit-dropdown">
          {searchable && (
            <div className="ui-kit-search">
              <input
                ref={searchInputRef}
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Поиск..."
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    e.stopPropagation();
                  }
                }}
              />
            </div>
          )}

          <ul className="ui-kit-options">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const isSelected = multiple
                  ? Array.isArray(value) && value.includes(option.value)
                  : option.value === value;

                return (
                  <li
                    key={option.value}
                    className={`ui-kit-option ${
                      isSelected ? "ui-kit-selected" : ""
                    } ${index === focusedIndex ? "ui-kit-focused" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOptionClick(option);
                    }}
                    onMouseEnter={() => setFocusedIndex(index)}
                  >
                    {option.label}
                    {isSelected && <span className="ui-kit-checkmark" />}
                  </li>
                );
              })
            ) : (
              <li className="ui-kit-option ui-kit-noOptions">
                {noOptionsMessage(filter)}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
