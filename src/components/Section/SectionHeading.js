import React from "react";

const SectionHeading = ({ title, Icon }) => {
  return (
    <div className="row row1 mb-20">
      <span className="pl color-black2 fw-500 fs-18">
        <i className="pl gap-right mr-10 lh-26 border-gray5 svg-ico">
          <Icon />
        </i>
        <em className="pl lh-32">{title}</em>
      </span>
    </div>
  );
};

export default SectionHeading;
