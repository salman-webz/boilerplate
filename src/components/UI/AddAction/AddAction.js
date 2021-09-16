import React from "react";
const AddAction = ({ label, clickHandler, Icon}) => {
  return (
    <div className="col col3">
      <a
        href="/#"
        className="row lh-50 btn-primary mw-1 align-center fs-12 radius28-1"
        onClick={e => {e.preventDefault(); clickHandler()}}
      >
        <em className="svg-ico svgWhite mr-5 strokeWhite">
          <Icon />
        </em>
        {label}
      </a>
    </div>
  );
};

export default AddAction;
