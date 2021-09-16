import React from "react";
import { ReactComponent as PaginationPrevIcon } from "../../../../assets/images/svg/paginationPrevIcon.svg";
import { ReactComponent as PaginationNextIcon } from "../../../../assets/images/svg/paginationNextIcon.svg";
import { pageNumbers } from "../../../../utils/paginate";
import { uuidv4 } from "../../../../utils/utility";

const PaginationList = ({
  pagesCount,
  breakLabel,
  breakMargin,
  windowRange,
  currentPage,
  onPageSelect,
  onPrevPageSelect,
  onNextPageSelect,
  onFirstPageSelect,
  onLastPageSelect
}) => {

  const renderPrevButton = (
    <button
      className={`previous-pagination ${currentPage === 1 ? 'deadLink' : ''}`}
      onClick={e => {
        e.preventDefault();
        onPrevPageSelect();
      }}
    >
      <em className="svg-ico">
        <PaginationPrevIcon />
      </em>
    </button>
  );

  const renderNextButton = (
    <button
      className={`next-pagination ${currentPage === pagesCount ? 'deadLink' : ''}`}
      onClick={e => {
        e.preventDefault();
        onNextPageSelect();
      }}
    >
      <em className="svg-ico">
        <PaginationNextIcon />
      </em>
    </button>
  );

  const renderRegular = page => {
    return (
      <button
        key={uuidv4()}
        className={`${page === currentPage ? "active" : ""}`}
        onClick={e => {
          e.preventDefault();
          onPageSelect(page);
        }}
      >
        {page}
      </button>
    );
  };

  const renderBreakLabel = _ => {
    return <button className="noPointer" key={uuidv4()}>{breakLabel}</button>;
  };

  const renderPagination = _ => {
    const pages = pageNumbers(
      currentPage,
      windowRange,
      breakMargin,
      breakLabel,
      pagesCount
    );
    return pages.map(page =>
      page !== breakLabel ? renderRegular(page) : renderBreakLabel()
    );
  };

  return (
    <>
      <label class="label-text lh-35 pr-25">displaying page</label>
      <button class="pagination-button mr-5" onClick={() => {onFirstPageSelect()}}>First</button>
      <div className="pagination-box">
        {renderPrevButton}
        {renderPagination()}
        {renderNextButton}
      </div>
      <button class="pagination-button ml-5" onClick={() => {onLastPageSelect()}}>Last</button>
    </>
    
  );
};

export default PaginationList;
