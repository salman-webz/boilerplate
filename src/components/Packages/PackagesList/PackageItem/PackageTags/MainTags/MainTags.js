import React from "react";
const MainTags = ({ tags }) => {
  return (
    <span>
      {tags.map((tag, i) => {
        return (
          <React.Fragment key={i}>
            <em className="color-green bg-cat1">
              {tag}
            </em>
            {i !== tags.length - 1 ? (
              <em key={i} className="hideOnListView ml-5 mr-5">|</em>
            ) : null}
          </React.Fragment>
        );
      })}
    </span>
  );
};

export default MainTags;
