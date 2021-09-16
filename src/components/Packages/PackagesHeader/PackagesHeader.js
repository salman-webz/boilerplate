import React from "react";

import { ReactComponent as PlusMinusIcon } from "../../../assets/svgs/plusMinusIcon.svg";
import { ReactComponent as ExportIcon } from "../../../assets/svgs/exportIcon.svg";

import ThumbnailList from "./ThumbnailList/Thumbnail";
import Dropdown from "../../UI/Dropdown/Dropdown";

const PackagesHeader = ({
  views,
  selectedView,
  onViewSelect,
  showAddTag,
  onAddTags,
  dropdownOptions,
  toggleDropdown,
  onExportDropdownSelect,
  onExportAllSelect,
  userRole,
  isExportAllSelected
}) => {
  const renderDropDownHeader = () => {
    return (
      <span
        className={`mb-0 btnn`}
        onClick={() => toggleDropdown(!dropdownOptions.open)}
      >
        <i className="svg-ico" data-svg="clearTagIco">
          <ExportIcon />
        </i>
        <em>Export</em>
      </span>
    );
  };

  const renderSelectAll = () => {
    return (
      <div className="pl ml-10 mt-7">
        <span className="checkbox sm round">
          <input
            type="checkbox"
            id="selectAll"
            onChange={e => onExportAllSelect(e.target.checked)}
            checked={isExportAllSelected}
          />
          <label htmlFor="selectAll">Select All</label>
        </span>
      </div>
    );
  };

  return (
    <div className="row row1 padding-7 bg-gray3 gridListHeader mb-10">
      {renderSelectAll()}
      <div className="pr tagCont mr-20 gridListTagD">
        {userRole ? <>
          <span
            className={`mb-0 btnn ${!showAddTag ? "deadLink" : ""}`}
            onClick={onAddTags}
          >
            <i className="svg-ico">
              <PlusMinusIcon />
            </i>
            <em>Add/Remove Tags</em>
          </span>
          </> : ''}

          <Dropdown
            disabled={false}
            options={dropdownOptions.data}
            defaultLabel="Export"
            selected={{}}
            onSelection={item => onExportDropdownSelect(item)}
            open={dropdownOptions.open}
            setOpen={toggleDropdown}
          >
            {renderDropDownHeader()}
          </Dropdown>
        
      </div>
      <div className="pr gridListBtnD">
        <span className="pl lh-30 mr-10">
          <em className="pl fw-500 mr-3">Showing:</em>
          <em className="pl">
            {selectedView === "card" ? "Thumbnail View" : "List View"}
          </em>
        </span>

        <ThumbnailList
          selectedView={selectedView}
          views={views}
          onViewSelect={onViewSelect}
        />
      </div>
    </div>
  );
};

export default PackagesHeader;
