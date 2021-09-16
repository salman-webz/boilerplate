import React from "react";
import DropdownItem from "./DropdownItem/DropdownItem";

const DropdownList = ({ options, onSelection, setOpen  }) => {
  return (
    <ul className="dropDownList lh-28 pt-10 pb-10">
      {options.map(item => {
        return (
          <DropdownItem
            key={item.name}
            onSelection={onSelection}
            name={item.name}
            Icon={item.icon}
            value={item.value}
            setOpen={setOpen}
            disabled={item.disabled}
          />
        );
      })}
    </ul>
  );
};

export default DropdownList;
