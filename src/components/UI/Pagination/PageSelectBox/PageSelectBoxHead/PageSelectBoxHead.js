import React from "react";
import { ReactComponent as RoleIcon } from "../../../../../assets/svgs/roleIcon.svg";
import { ReactComponent as CarrotIcon } from "../../../../../assets/svgs/carrotIcon.svg";
const PageSelectBoxHead = ({ limit, handleOpen }) => {
  return (
    <div className="row selectBoxHead" onClick={_ => handleOpen()}>
      <em className="svg-ico inputIcon">
        <RoleIcon />
      </em>
      <input
        type="text"
        name=""
        className="row selectBoxValue"
        readOnly
        placeholder="Role"
        value={limit}
      />

      <em className="svg-ico pr selectBoxIco">
        <CarrotIcon />
      </em>
    </div>
  );
};

export default PageSelectBoxHead;
