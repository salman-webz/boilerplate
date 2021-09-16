import React from "react";
import PackageTitle from "./PackageTitle/PackageTitle";
import PackageScreenShot from "./PackageScreenShot/PackageScreenShot";
import PackageTags from "./PackageTags/PackageTags";
import PackageDetail from "./PackageDetail/PackageDetail";

const PackageItem = ({ pkg, onPackageSelect, onViewDetail, onImgClick }) => {
  return (
    <div className={`boxD ${pkg.selected ? 'border-blue': ''}`}>
      <PackageTitle pkg={pkg} onPackageSelect={onPackageSelect} />
      <PackageScreenShot
        pkgId={pkg.pkg_id}
        title={pkg.rtitle}
        createdAt={pkg.created_at}
        url={pkg.ourl}
        onPackageSelect={onPackageSelect}
        pkg={pkg}
        onImgClick={onImgClick}
      />
      <PackageTags tags={pkg.tags} />
      <PackageDetail onViewDetail={onViewDetail} pkg={pkg} />
    </div>
  );
};

export default PackageItem;
