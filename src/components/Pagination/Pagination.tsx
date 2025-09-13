// Pagination.tsx
import React from "react";
import "./styles.scss";

interface PaginationProps {
  /**
   * Текущая страница (начинается с 1)
   */
  currentPage: number;

  /**
   * Общее количество элементов
   */
  totalItems: number;

  /**
   * Количество элементов на одной странице
   * @default 10
   */
  pageSize?: number;

  /**
   * Максимальное количество видимых кнопок пагинации (включая троеточия)
   * @default 5
   */
  siblingCount?: number;

  /**
   * Обработчик изменения страницы
   */
  onPageChange: (page: number) => void;

  /**
   * Неактивное состояние
   */
  disabled?: boolean;

  /**
   * Дополнительный класс
   */
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize = 10,
  siblingCount = 1,
  onPageChange,
  disabled = false,
  className = "",
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  // Ограничиваем currentPage
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  if (totalPages <= 1) return null; // не показываем пагинацию при одной странице

  const handlePageClick = (page: number) => {
    if (disabled || page === safeCurrentPage || page < 1 || page > totalPages)
      return;
    onPageChange(page);
  };

  const goToPrevious = () => {
    if (safeCurrentPage > 1) {
      onPageChange(safeCurrentPage - 1);
    }
  };

  const goToNext = () => {
    if (safeCurrentPage < totalPages) {
      onPageChange(safeCurrentPage + 1);
    }
  };

  // Генерация списка страниц
  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    const totalSiblings = 2 * siblingCount;
    const totalDisplayedButtons = 2 + totalSiblings + 2; // first, last, next, prev, siblings

    if (totalPages <= totalDisplayedButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(2, safeCurrentPage - siblingCount);
      const end = Math.min(totalPages - 1, safeCurrentPage + siblingCount);

      pages.push(1);

      if (start > 2) {
        pages.push("ellipsis-before");
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) {
        pages.push("ellipsis-after");
      }

      pages.push(totalPages);
    }

    return pages.map((page, idx) => {
      if (page === "ellipsis-before") {
        return (
          <li key={`ellipsis-before-${idx}`} className="ui-kit-paginationItem">
            <span className="ui-kit-paginationEllipsis">…</span>
          </li>
        );
      }
      if (page === "ellipsis-after") {
        return (
          <li key={`ellipsis-after-${idx}`} className="ui-kit-paginationItem">
            <span className="ui-kit-paginationEllipsis">…</span>
          </li>
        );
      }

      return (
        <li key={page} className="ui-kit-paginationItem">
          <button
            type="button"
            className={`ui-kit-paginationButton ${
              safeCurrentPage === page ? "ui-kit-active" : ""
            }`}
            onClick={() => handlePageClick(page as number)}
            disabled={disabled}
            aria-current={safeCurrentPage === page ? "page" : undefined}
            aria-label={`Страница ${page}`}
          >
            {page}
          </button>
        </li>
      );
    });
  };

  return (
    <nav
      className={`ui-kit-pagination ${className}`}
      aria-label="Пагинация"
      role="navigation"
    >
      <ul className="ui-kit-paginationList">
        {/* Кнопка "Назад" */}
        <li className="ui-kit-paginationItem">
          <button
            type="button"
            className={`ui-kit-paginationButton ui-kit-paginationNav ${
              safeCurrentPage === 1 ? "ui-kit-disabled" : ""
            }`}
            onClick={goToPrevious}
            disabled={disabled || safeCurrentPage === 1}
            aria-label="Предыдущая страница"
          ></button>
        </li>

        {renderPageNumbers()}

        {/* Кнопка "Вперёд" */}
        <li className="ui-kit-paginationItem">
          <button
            type="button"
            className={`ui-kit-paginationButton ui-kit-paginationNav ${
              safeCurrentPage === totalPages ? "ui-kit-disabled" : ""
            }`}
            onClick={goToNext}
            disabled={disabled || safeCurrentPage === totalPages}
            aria-label="Следующая страница"
          ></button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
