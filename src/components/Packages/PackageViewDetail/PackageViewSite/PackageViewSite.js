import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Dropdown from "../../../UI/Dropdown/Dropdown";
import Popup from "../../../UI/Popup/Popup";
import { ReactComponent as DotsIcon } from "../../../../assets/svgs/verticalDots.svg";
import { extractData } from "../../../../store/actions/";

import {
  togglePackageDetailDropdown,
} from "../../../../store/actions";

const PackageViewSite = ({ createdAt, url, pkg }) => {

  const packageDetailDropdown = useSelector(state => state.dropdown.packageDetailDropdown);
  const [popupConfig, setPopupConfig] = useState({show: false, type: '', data: '', loader: true});
  const dispatch = useDispatch();
  const setOpen = open => {
    dispatch(togglePackageDetailDropdown(open));
  };

  return (
    <>
    <div className="row">
      <label className="pl fw-500">Site Link</label>

      <Dropdown
        disabled={false}
        options={packageDetailDropdown.data}
        defaultLabel={''}
        selected={{}}
        onSelection={item => {
          setPopupConfig({show: true, type: item, data: '', loader:true});
          dispatch(extractData(pkg.pkg_id,item,setPopupConfig));
        }}
        open={packageDetailDropdown.open}
        setOpen={setOpen}
      >
        <div className="dropDownHead row pl" onClick={() => setOpen(!packageDetailDropdown.open)}>
          <em className="pr ml-10 dropDownIco">
            <DotsIcon/>
          </em>
        </div>
      </Dropdown>

      <label className="pr fs-12">
        <em className="fw-500">Created At:</em> {createdAt}
      </label>
      <div className="row radius8 padding-5 bg-gray5 mt-8 mb-8 wordBreak fs-12 lh-18">
      <a href={url} target="_blank" rel="noreferrer" className="full fs-12 ellipses color-black2">{url}</a>
      </div>
    </div>

    <Popup 
      config={popupConfig}
      setConfig={setPopupConfig}
    />

    </>
  );
};

export default PackageViewSite;
