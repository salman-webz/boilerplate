import React from "react";
const PageSelectBoxList = ({ onLimitSelect, limitRanges }) => {
  const renderLimitRanges = ranges => {
    return ranges.map(range => {
      return (
        <li className="row" key={range}>
          <a href="#/" className="row" onClick={e => {e.preventDefault(); onLimitSelect(range)}}>
            {range}
          </a>
        </li>
      );
    });
  };

  return (
    <div className="selectBoxList row">
      <ul>{renderLimitRanges(limitRanges)}</ul>
    </div>
  );
};

export default PageSelectBoxList;
