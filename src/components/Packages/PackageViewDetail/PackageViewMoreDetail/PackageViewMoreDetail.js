import React from "react";
import { ReactComponent as CopyIcon } from "../../../../assets/svgs/copyIcon.svg";
import { copyToClipBoard } from "../../../../utils/utility";


const PackageViewMoreDetail = ({ path, ourl, rurl, phash }) => {
  return (
    <div className="row mb-15">
      <label className="pl fw-500">Details</label>
      <div className="row radius8 bg-gray5 mt-8 mb-8 fs-12 color-black2 pointer">
        <span className="row pt-8 pb-8 pr-10 pl-10 relative bg-gray7 border-top-left-radius-8 border-top-right-radius-8">
          <span className="pl fw-500 color-black3">Path: </span>
          <span className="row tooltipWrap">
            <span className="tooltip"><span className="pr-20 row">{path}</span></span>
            <span className="ellipses pl">{path}</span>
          </span>
          <em className="copy-artifacts" id="path" onClick={(e) => copyToClipBoard(path,"path")}><CopyIcon/><em className="color-blue3 pr pl-5">Copy</em></em> 
        </span>
        <span className="row pt-8 pb-8 pr-10 pl-10 relative">
          <span className="pl fw-500 color-black3">OURL: </span>
          <span className="row tooltipWrap">
            <span className="tooltip"><span className="pr-20 row">{ourl}</span></span>
            <a href={ourl} target="_blank" rel="noreferrer" className="fs-12 ellipses pl color-black2"> {ourl}</a>
          </span> 
          <em className="copy-artifacts" id="ourl" onClick={(e) => copyToClipBoard(ourl,"ourl")}><CopyIcon/><em className="color-blue3 pr pl-5">Copy</em></em>
        </span>
        <span className="row pt-8 pb-8 pr-10 pl-10 relative bg-gray7">
          <span className="pl fw-500 color-black3">pHash: </span>
          <span className="row tooltipWrap">
            <span className="tooltip"><span className="pr-20 row">{phash}</span></span>
            <span className="ellipses pl"> {phash}</span>
          </span> 
          <em className="copy-artifacts" id="phash" onClick={(e) => copyToClipBoard(phash,"phash")}><CopyIcon/><em className="color-blue3 pr pl-5">Copy</em></em>
        </span>
        <span className="row pt-8 pb-8 pr-10 pl-10 pointer relative">
          <span className="pl fw-500 color-black3">RURL: </span>
          <span className="row tooltipWrap">
            <span className="tooltip"><span className="pr-20 row">{rurl}</span></span>
            <a href={rurl} target="_blank" rel="noreferrer" className="fs-12 ellipses pl color-black2"> {rurl}</a>
          </span> 
          <em className="copy-artifacts" id="rurl" onClick={(e) => copyToClipBoard(rurl,"rurl")}><CopyIcon/><em className="color-blue3 pr pl-5">Copy</em></em>
        </span>
      </div>
    </div>
  );
};

export default PackageViewMoreDetail;
