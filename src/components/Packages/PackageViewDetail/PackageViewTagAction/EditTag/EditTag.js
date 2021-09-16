import React from "react";

const EditTag = ({
  pkg,
  onEditActionTagHandler,
  onCancelActionTagHandler
}) => {
  const renderEditBtn = (
    <a
      href="/#"
      className="pr fs-12 color-blue"
      onClick={e => {
        e.preventDefault();
        onEditActionTagHandler();
      }}
    >
      Edits
    </a>
  );

  const renderDoneBtn = (
    <a
      href="/#"
      className="pr fs-12 color-blue"
      onClick={e => {
        e.preventDefault();
      }}
    >
      Done
    </a>
  );

  const renderCancelBtn = (
    <a
      href="/#"
      className="pr mr-8 fs-12 color-blue"
      onClick={e => {
        e.preventDefault();
        onCancelActionTagHandler();
      }}
    >
      Cancel
    </a>
  );

  const renderToggleBtns = pkg.editMode ? (
    <>
      {renderDoneBtn} {renderCancelBtn}
    </>
  ) : (
    renderEditBtn
  );

  return (
    <div className="row selected-tags">
      <label className="pl fw-500">Selected Tags</label>
      {renderToggleBtns}
    </div>
  );
};

export default EditTag;
