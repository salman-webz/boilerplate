import classNames from "classnames";
import React from "react";

const DropDown = ({
  dropdownList,
  changeHandler,
  classList
}) => {
  return (
     <ul className={classNames("absolute z-10 drop-down", classList)}>
        {dropdownList.map((item, index) =>
            <li className="cursor-default" onClick={() => changeHandler(item)} key={index}>
                {item.icon || item}
                {item.path && item.path}
            </li>
        )}
    </ul>
  );
};

export default DropDown;
