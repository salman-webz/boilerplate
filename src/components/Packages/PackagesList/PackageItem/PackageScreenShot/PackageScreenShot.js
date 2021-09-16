import React from "react";
import useImage from "../../../../../hooks/useImage";
import Loader from "../../../../UI/Loader/Loader";
import moment from "moment";
import config from "../../../../../config";
import { ReactComponent as NoImage } from '../../../../../assets/svgs/noImageFoundIcon.svg';
const {
  server: { REGEX }
} = config;

const PackageScreenShot = ({ pkgId, title, url, createdAt, onPackageSelect, pkg, onImgClick }) => {
  const [imgSrc, isLoaded] = useImage(pkgId, REGEX.GetImageThumbnail);
  return (
    <>
      <div className="boxImg relative pointer" onClick={(e) => onImgClick(pkgId)}>
        <Loader isLoading={isLoaded} />
        { (!isLoaded && imgSrc) ? <img src={imgSrc} alt="" /> : <NoImage/> }
      </div>
      <div className="titleD showOnListView pl-30 pointer"  onClick={e => onPackageSelect(pkg, pkg.selected)}>
        <p className="ellipses" title={title}>{title}</p>
      </div>
      <div className="imgLabel">
        <a href={url} target="_blank" rel="noreferrer" className="full fw-500 fs-12 mb-5 ellipses color-black2">{url}</a>
        <p className="hideOnListView color-gray6 fs-11">
          Created At: {moment(createdAt).format("MM/DD/YYYY")}
        </p>
      </div>
    </>
  );
};

export default PackageScreenShot;
