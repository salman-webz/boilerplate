import React from "react";
import PageSelectBox from "./PageSelectBox/PageSelectBox";
import PaginationList from "./PaginationList/PaginationList";

const Pagination = ({
  label = "Show",
  breakLabel,
  breakMargin,
  windowRange,
  pageSize,
  limitRanges,
  isOpenSelectBox,
  currentPage,
  totalCount = 0,
  onPageSelect,
  onPrevPageSelect,
  onNextPageSelect,
  onLimitSelect,
  toggleSelectBox,
  onFirstPageSelect,
  onLastPageSelect
}) => {
  const pagesCount = Math.ceil(totalCount / pageSize);
  if (totalCount <= 10) return null;

  return (
    <div className="pagination">
      {/* <div className="pl fs-12 color-black3">
        <span className="pl mr-10">{label}</span>
        <PageSelectBox
          limit={pageSize}
          isOpenSelectBox={isOpenSelectBox}
          onLimitSelect={onLimitSelect}
          limitRanges={limitRanges}
          onLimitSelect={onLimitSelect}
          toggleSelectBox={toggleSelectBox}
        />
        <span className="ml-10 pl">{totalCount} Records Found</span>
      </div> */}
      {pagesCount > 1 ? (
        <PaginationList
          pagesCount={pagesCount}
          currentPage={currentPage}
          onPageSelect={onPageSelect}
          onPrevPageSelect={onPrevPageSelect}
          onNextPageSelect={onNextPageSelect}
          breakLabel={breakLabel}
          breakMargin={breakMargin}
          windowRange={windowRange}
          onFirstPageSelect={onFirstPageSelect}
          onLastPageSelect={onLastPageSelect}
        />
      ) : null}
    </div>
  );
};

export default Pagination;
