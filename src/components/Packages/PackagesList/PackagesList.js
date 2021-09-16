import React from "react";
import PackageItem from "./PackageItem/PackageItem";
const PackagesList = ({
  packages,
  selectedView,
  onPackageSelect,
  onViewDetail,
  onImgClick
}) => {
  const renderPackages = packages => {
    return packages.map(pkg => {
      return (
        <PackageItem
          pkg={pkg}
          key={pkg.pkg_id}
          onPackageSelect={onPackageSelect}
          onViewDetail={onViewDetail}
          onImgClick={onImgClick}
        />
      );
    });
  };

  return (
    <div
      className={`row row2 gridListCont align-center ${
        selectedView === "card" ? "gridVew" : "listView"
      }`}
    >
      {renderPackages(packages)}
    </div>
  );
};

export default PackagesList;
