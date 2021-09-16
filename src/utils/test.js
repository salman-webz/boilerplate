var __createNumbersFrom = (start, end) =>
  Array.from({ length: end }, (_, i) => start + i + 1);

var pageNumbers = (selected, pageRangeDisplayed, marginPagesDisplayed, breakLabel, pageCount) => {
    const items = [];
    if (pageCount <= pageRangeDisplayed) {
      for (let index = 0; index < pageCount; index++) {
        items.push(index + 1);
      }
    } else {
      let leftSide = pageRangeDisplayed / 2;
      let rightSide = pageRangeDisplayed - leftSide;

  
      if (selected > pageCount - pageRangeDisplayed / 2) {
        rightSide = pageCount - selected;
        leftSide = pageRangeDisplayed - rightSide;
      } else if (selected < pageRangeDisplayed / 2) {
        leftSide = selected;
        rightSide = pageRangeDisplayed - leftSide;
      }

      let index;
      let page;
   

      for (index = 0; index < pageCount; index++) {
        page = index + 1;

   
        if (page <= marginPagesDisplayed) {
          items.push(page);
          continue;
        }

      
        if (page > pageCount - marginPagesDisplayed) {
          items.push(page);
          continue;
        }

      
        if (index >= selected - leftSide && index <= selected + rightSide) {
          items.push(page);
          continue;
        }

     
        if (breakLabel && items[items.length - 1] !== breakLabel) {
          items.push(breakLabel);
        }
      }
    }

    return items;
 
};