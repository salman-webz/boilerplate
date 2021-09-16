import React from "react";
import Search from "../Search/Search";
import Tags from "../Tags/Tags";

const TagSearch = ({
  classes,
  apiPath,
  onTagSelect,
  Icon,
  ClearIcon,
  label,
  onTagClear,
  tags,
  setTags,
  minTagDisplay,
  keys
}) => {
  const renderClearAll = tags => {
    return tags.length > 1 ? (
      <a
        href="/#"
        className="pl mr-25 mb-10 tagBtn bg-gray5"
        onClick={e => {
          e.preventDefault();
          setTags([]);
        }}
      >
        <ClearIcon />
      </a>
    ) : null;
  };

  return (
    <div className="three-eighth">
      <Search
        apiPath={apiPath}
        onItemSelect={onTagSelect}
        Icon={Icon}
        label={label}
        classes={classes}
        keys={keys}
      />
      <div className="row tagCont pl-10 pr-10">
        {renderClearAll(tags)}
        <Tags
          onClear={onTagClear}
          tags={tags}
          minTagDisplay={minTagDisplay}
          keys={keys}
        />
      </div>
    </div>
  );
};

export default TagSearch;
