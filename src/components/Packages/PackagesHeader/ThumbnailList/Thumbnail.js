import React from "react";
import ThumbnailItem from "./ThumbnailItem/ThumbnailItem";
const ThumbnailList = ({ views, onViewSelect, selectedView }) => {
  return views.map(view => (
    <ThumbnailItem
      key={view.id}
      selectedView={selectedView}
      view={view}
      onViewSelect={onViewSelect}
    />
  ));
};

export default ThumbnailList;
