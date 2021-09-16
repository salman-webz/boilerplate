import React from "react";
const PackageTitle = ({ pkg, onPackageSelect }) => {
  return (
    <div className="boxTitle bg-gray3 pointer" onClick={e => onPackageSelect(pkg, pkg.selected)}>
      <span className="checkbox sm round">
        <input
          type="checkbox"
          id={pkg.pkg_id}
          checked={pkg.selected}
          onClick={e => onPackageSelect(pkg, pkg.selected)}
        />
        <label htmlFor={pkg.pkg_id} className="hideOnListView ellipses" title={pkg.rtitle}>
          {pkg.rtitle}
        </label>
      </span>
    </div>
  );
};

export default PackageTitle;
