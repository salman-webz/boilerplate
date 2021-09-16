import React from "react";
import TagItem from "./TagItem/TagItem";
import { getTags } from "../../../utils/utility";

const Tags = ({ tags, onClear, minTagDisplay, keys }) => {
  const [normalTags, moreTags] = getTags(tags, minTagDisplay, keys);
  return normalTags.map(tag => {
    return (
      <TagItem
        onClear={onClear}
        tag={tag}
        key={tag[keys[0]]}
        tags={moreTags}
        keys={keys}
      />
    );
  });
};

Tags.defaultProps = {
  minTagDisplay: 3
};

export default Tags;
