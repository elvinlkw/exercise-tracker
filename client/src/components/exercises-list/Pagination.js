import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ currentPage, pageNumber, paginate }) => {
  return (
    <div aria-label="...">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
          <a className="page-link" href="true" tabIndex="-1" onClick={e => paginate(e, currentPage - 1)}>Previous</a>
        </li>
        {pageNumber.map((page, index) => (
          <li key={index} className={`page-item ${currentPage === page && 'active'}`}>
            <a className="page-link" href="true" onClick={e => paginate(e, page) }>{page}</a>
          </li>
        ))}
        <li className={`page-item ${currentPage === pageNumber.length && 'disabled'}`}>
          <a className="page-link" href="true" onClick={e => paginate(e, currentPage + 1)}>Next</a>
        </li>
      </ul>
    </div>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pageNumber: PropTypes.array.isRequired,
  paginate: PropTypes.func.isRequired
}

export default Pagination;