import React from "react";

import PackageViewSite from "./PackageViewSite/PackageViewSite";
import PackageViewScreenShot from "./PackageViewScreenShot/PackageViewScreenShot";
import PackageViewMoreDetail from "./PackageViewMoreDetail/PackageViewMoreDetail";
import PackageTagAction from "./PackageViewTagAction/PackageViewTagAction";
import PackageViewTagsList from "./PackageViewTagsList/PackageViewTagsList";
import moment from "moment";

const PackageViewDetail = ({
  pkg,
  onAddActionTagHandler,
  onEditActionTagHandler,
  onCancelActionTagHandler,
  showEditTag,
  tempTags,
  handlePackageDetailTagClear,
  editMode,
  tempTagsError,
  currentTag,
  setCurrentTag,
  RemoveTagCancelHandler,
  RemoveTagDoneHandler,
  showDeletePopup,
  onImgClick
}) => {
  const { created_at, pkg_path, phash, ourl, pkg_id } = pkg;
  return (
    <div className="row beforeSuccessDiv package-detail">
      <PackageViewSite
        createdAt={moment(created_at).format("MM/DD/YYYY")}
        url={ourl}
        pkg={pkg}
      />
      <PackageViewScreenShot pkgId={pkg_id} onImgClick={onImgClick} />
      <PackageViewMoreDetail
        path={pkg_path}
        phash={phash}
        ourl={ourl}
        rurl={ourl}
      />
      <PackageTagAction
        selectedPkg={pkg}
        onAddActionTagHandler={onAddActionTagHandler}
        onEditActionTagHandler={onEditActionTagHandler}
        onCancelActionTagHandler={onCancelActionTagHandler}
        showEditTag={showEditTag}
        tempTagsError={tempTagsError}
        currentTag={currentTag}
        setCurrentTag={setCurrentTag}
      />
      <PackageViewTagsList
        onTagClear={handlePackageDetailTagClear}
        editMode={editMode}
        tags={tempTags}
        showDeletePopup={showDeletePopup}
        RemoveTagCancelHandler={RemoveTagCancelHandler}
        RemoveTagDoneHandler={RemoveTagDoneHandler}
      />
    </div>
  );
};

export default PackageViewDetail;
