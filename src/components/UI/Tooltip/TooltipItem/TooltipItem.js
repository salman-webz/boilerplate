import React from "react";
import { ReactComponent as ClearIcon } from "../../../../assets/svgs/clearIcon.svg";

const TooltipItem = ({ tag, onClear, keys }) => {
  return (
    <li>
      <em>{tag[keys[1]]}</em>
      <i className="svg-ico" onClick={() => onClear(tag)}>
        <ClearIcon />
      </i>
    </li>
  );
};

export default TooltipItem;
