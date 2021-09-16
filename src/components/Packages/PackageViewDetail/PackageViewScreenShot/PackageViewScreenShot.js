import React from "react";
import useImage from "../../../../hooks/useImage";
import Loader from "../../../UI/Loader/Loader";
import config from "../../../../config";
const { server : { RMI }} = config;

const PackageViewScreenShot = ({ pkgId, onImgClick }) => {
  const [imgSrc, isLoaded] = useImage(pkgId, RMI.GetImage);
  return (
    <div className="row mb-15 pointer" onClick={(e) => onImgClick(pkgId)}>
      <div className="imgD align-center relative">
        <Loader isLoading={isLoaded} />
        {!isLoaded ? <img src={imgSrc} alt="" /> : null}
      </div>
    </div>
  );
};

export default PackageViewScreenShot;
