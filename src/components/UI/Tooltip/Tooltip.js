import React from "react";
import TooltipItem from "./TooltipItem/TooltipItem";

const Tooltip = ({ tags, onClear, showTooltip, keys }) => {
  return (
    <div
      style={{ display: showTooltip ? "block" : "none" }}
      data-dir="right"
      className="toolTipDiv"
    >
      <ul>
        {tags.map(tag => (
          <TooltipItem keys={keys} tag={tag} onClear={onClear} key={tag[keys[0]]} />
        ))}
      </ul>
    </div>
  );
};

export default Tooltip;
