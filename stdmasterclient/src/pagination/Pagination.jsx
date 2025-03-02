import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { BiFirstPage, BiLastPage } from 'react-icons/bi';
import Tooltip from '../tooltip/Tooltip';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const generatePageNumbers = () => {
    const pages = [];

    if (totalPages <= 2) {
      // Show all pages if totalPages is 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show the first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      // Show two pages before the current page, the current page, and two pages after the current page
      const startPage = Math.max(currentPage - 2, 2);
      const endPage = Math.min(currentPage + 2, totalPages - 1);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      // Always show the last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page) => {
    if (page !== '...') {
      onPageChange(page);
    }
  };

  return (
    <div className="flex justify-center mt-4 space-x-1">
      {currentPage > 1 && (
        <>
          <Tooltip tooltip="Firstpage">
            <button
              onClick={() => onPageChange(1)}
              className="btn btn-ghost btn-sm mx-1"
              disabled={currentPage === 1}
            >
              <BiFirstPage />
            </button>
          </Tooltip>
          <Tooltip tooltip="Previous">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="btn btn-ghost btn-sm mx-1"
              disabled={currentPage === 1}
            >
              <FaArrowLeft />
            </button>
          </Tooltip>
        </>
      )}

      {generatePageNumbers().map((page, index) => (
        <span
          key={index}
          onClick={() => handlePageClick(page)}
          style={{
            cursor: 'pointer',
            margin: '0 0.5rem',
            color: page === currentPage ? 'green' : 'white',
          }}
          className={page === '...' ? 'disabled' : ''}
        >
          {page}
        </span>
      ))}

      {currentPage < totalPages && (
        <>
          <Tooltip tooltip="Next">
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="btn btn-ghost btn-sm mx-1"
              disabled={currentPage === totalPages}
            >
              <FaArrowRight />
            </button>
          </Tooltip>
          <Tooltip tooltip="Lastpage">
            <button
              onClick={() => onPageChange(totalPages)}
              className="btn btn-ghost btn-sm mx-1"
              disabled={currentPage === totalPages}
            >
              <BiLastPage />
            </button>
          </Tooltip>
        </>
      )}
    </div>
  );
};

export default Pagination;
