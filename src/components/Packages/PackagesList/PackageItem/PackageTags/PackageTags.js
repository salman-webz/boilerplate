import React from "react";
import MainTags from "./MainTags/MainTags";
import PackageTooltip from "./PackageTooltip/PackageTooltip";
const PackageTags = ({ tags = [] }) => {
  const DISPLAY_MIN_TAGS = 3;
  return (
    <div className="tagsLabel">
      <p className="hideOnListView fw-500 fs-12 mb-5">Tags</p>
      <div className="fs-11 boxTagR">
        <MainTags tags={tags.slice(0, DISPLAY_MIN_TAGS)} />
        {tags.length > DISPLAY_MIN_TAGS ? (
          <PackageTooltip moreTags={tags.slice(DISPLAY_MIN_TAGS)} />
        ) : null}
      </div>
    </div>
  );
};

export default PackageTags;
