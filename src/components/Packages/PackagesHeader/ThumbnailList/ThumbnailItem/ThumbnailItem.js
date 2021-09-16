import React from "react";
const ThumbnailItem = ({ onViewSelect, view, selectedView }) => {
  return (
    <a
      onClick={e => {
        e.preventDefault();
        onViewSelect(view);
      }}
      href="/#"
      className={`pl mr-10 tagBtn ${
        view.name === selectedView ? "active" : ""
      } ${view.name === 'list' ? "" : ""}`}
    >
      <i className="svg-ico" data-svg="clearTagIco">
        <view.icon />
      </i>
    </a>
  );
};

export default ThumbnailItem;
