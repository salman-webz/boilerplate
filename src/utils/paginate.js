// Helpers
const __createNumbersFrom = (start, end) =>
  Array.from({ length: end }, (_, i) => start + i + 1);

// Public Methods
export const paginatePerPage = (items, pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex).slice(0, pageSize);
};

export const pageNumbers = (
  current,
  windowRange,
  breakMargin,
  breakLabel,
  totalPages
) => {
  // Don't need to display breakLabel ...
  if (totalPages <= windowRange) return __createNumbersFrom(0, totalPages);

  const pages = [];
  let leftWindow = windowRange / 2;
  let rightWindow = windowRange - leftWindow;

  // if current is by default on right side range
  if (current > totalPages - windowRange / 2) {
    rightWindow = totalPages - current;
    leftWindow = windowRange - rightWindow;
  } else if (current < windowRange / 2) {
    leftWindow = current;
    rightWindow = windowRange - leftWindow;
  }

  let page;

  // NOTE: Need to imporve these iterations as there are multiple redundant iterations!!
  for (var i = 0; i < totalPages; i++) {
    page = i + 1;

    // Left side with margin would be fixed
    if (page <= breakMargin) {
      pages.push(page);
      continue;
    }

    // Right side with margin would be fixed
    if (page > totalPages - breakMargin) {
      pages.push(page);
      continue;
    }

    // getting sliced items between left and right margin window
    if (i >= current - leftWindow && i <= current + rightWindow) {
        pages.push(page);
        continue;
    }

    // if last element in pages is not breakLabel '...' we need to add '...'
    // other wise skip the iteration
    if (breakLabel && pages[pages.length - 1] !== breakLabel) {
      pages.push(breakLabel);
    }
  }

  return pages;
};
