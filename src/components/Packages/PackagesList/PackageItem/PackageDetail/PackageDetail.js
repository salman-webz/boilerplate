import React from "react";

const PackageDetail = ({ onViewDetail, pkg }) => {
  return (
    <div className="actionD">
      <a
        onClick={e => {
          e.preventDefault();
          onViewDetail(pkg);
        }}
        href="/#"
        className="color-blue border-blue align-center lh-38 fs-12"
      >
        View Details
    </a>
    </div>
  );
};

export default PackageDetail;
