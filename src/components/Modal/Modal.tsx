// Modal.tsx
import React, { useEffect, useRef } from "react";
import "./styles.scss";

interface ModalProps {
  /**
   * Открыт ли модал
   */
  open: boolean;

  /**
   * Обработчик закрытия
   */
  onClose: () => void;

  /**
   * Заголовок модала
   */
  title?: string;

  /**
   * Контент внутри (children)
   */
  children?: any;

  /**
   * Показывать ли кнопку закрытия (крестик)
   * @default true
   */
  showCloseButton?: boolean;

  /**
   * Можно ли закрывать кликом по бэкдропу
   * @default true
   */
  closeOnBackdropClick?: boolean;

  /**
   * Дополнительный класс для контента
   */
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
  showCloseButton = true,
  closeOnBackdropClick = true,
  className = "",
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const focusTrapRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      focusTrapRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnBackdropClick) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div
      className="ui-kit-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? "ui-kit-modal-title" : undefined}
    >
      <div className="ui-kit-modal__backdrop" onClick={handleBackdropClick} />

      <div className="ui-kit-modal__window" ref={modalRef}>
        <div className={`ui-kit-modal__content ${className}`}>
          {(title || showCloseButton) && (
            <div className="ui-kit-modal__header">
              {title && (
                <h3 id="ui-kit-modal-title" className="ui-kit-modal__title">
                  {title}
                </h3>
              )}
              {showCloseButton && (
                <button
                  type="button"
                  className="ui-kit-modal__close-btn"
                  aria-label="Закрыть модальное окно"
                  onClick={onClose}
                >
                  ×
                </button>
              )}
            </div>
          )}

          <div className="ui-kit-modal__body">{children}</div>

          <button
            ref={focusTrapRef}
            tabIndex={0}
            className="ui-kit-modal__focus-trap"
            onFocus={() => {
              if (modalRef.current) {
                const lastFocusable = modalRef.current.querySelector(
                  'button:not([disabled]), [href], input, select, textarea, [tabindex="0"]'
                );
                if (lastFocusable instanceof HTMLElement) {
                  lastFocusable.focus();
                } else {
                  onClose();
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;
