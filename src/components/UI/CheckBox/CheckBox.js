import React from "react";
import InputField from "../InputField/InputField";

const CheckBox = ({ label, id }) => {
  return (
    <span className="checkbox sm round">
      <InputField type="checkbox" id={id} />
      <label htmlFor={id}>{label}</label>
    </span>
  );
};

export default CheckBox;
