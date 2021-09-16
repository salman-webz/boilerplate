import React from "react";
import { ReactComponent as CloseIcon } from "../../../../assets/svgs/closeIcon.svg";

const PackageViewTagsList = ({ tags = [], editMode, onTagClear = () => {}, showDeletePopup, RemoveTagCancelHandler, RemoveTagDoneHandler }) => {
  return (
    <div className="row padding-3 border-gray5 radius5 mb-20 mh-200 relative">
      <div className="tagCont catCont">
        <div className={`row deleteConfirmation align-center ${showDeletePopup && !showDeletePopup.show ? 'hide' : ''}`}>
          <div className="row absolute-center">
              <p className="mb-25">Are you sure want to remove <em className="color-blue3">{showDeletePopup ? showDeletePopup.tag : ''}</em> tag from the list?</p>
              <a href="#/" className="btn btn-default mr-15" onClick={() => RemoveTagDoneHandler()}>Remove</a>
              <a href="#/" className="btn btn-default" onClick={() => RemoveTagCancelHandler()}>Cancel</a>
          </div>
        </div>
        {tags.map((tag, i) => {
          return (
            <span key={i} className={`${editMode ? "" : "pr-10"}`}>
              <em>{tag}</em>
              {editMode ? (
                <i onClick={_ => onTagClear(tag)} className="svg-ico" data-svg="clearTagIco">
                  <CloseIcon />
                </i>
              ) : null}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default PackageViewTagsList;
