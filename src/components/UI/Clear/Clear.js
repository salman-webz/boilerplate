import React from 'react';
import { ReactComponent as ClearIcon } from "../../../assets/svgs/clearIcon.svg";

const Clear = (props) => {
  return (
    <i className="svg-ico" onClick={() => props.onClick(props.tagKey)}>
      <ClearIcon />
    </i>
  );
};

export default Clear;
