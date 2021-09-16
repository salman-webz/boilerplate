import React from "react";
const DropdownItem = ({ onSelection, Icon, name, value, setOpen, disabled }) => {
  return (
    <li
      className={`row ${disabled ? 'deadLink' : ''}`}
      onClick={(e) => {
        e.preventDefault();
        onSelection(value);
        setOpen(false);
      }}
    >
      <a href="/#" className="row">
        <em className="svg-ico pl mr-10">
          <Icon />
        </em>
        <em>{name}</em>
      </a>
    </li>
  );
};

export default DropdownItem;
