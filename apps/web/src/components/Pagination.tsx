// apps/web/src/components/Pagination.tsx
import React from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex justify-center mt-4">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`px-4 py-2 mx-1 border ${
            currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
          }`}
          onClick={() => onPageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
