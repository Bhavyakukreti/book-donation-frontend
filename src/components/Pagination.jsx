import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div>
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          style={{ fontWeight: currentPage === index + 1 ? "bold" : "normal" }}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
