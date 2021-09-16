import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as ClearIcon } from "../../../../assets/svgs/clearIcon.svg";
import { ReactComponent as PlusTagIcon } from "../../../../assets/svgs/plusTagIcon.svg";
import Tooltip from "../../Tooltip/Tooltip";

const TagItem = ({ tag, onClear, tags, keys }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    const clickHandler = (e) => {
      if (ref && ref.current && ref.current.contains(e.target)) {
        return;
      } else setShowTooltip(false);
    };

    document.body.addEventListener("click", clickHandler);

    return () => {
      document.body.removeEventListener("click", clickHandler);
    };
  }, []);
  
  const ref = useRef();

  const populateSpanProps = () => {
    const spanProps = {
      className: tag.more ? "btnn toolTipBtn" : ""
     
    };

    if (tag.more) {
      spanProps.onClick = () => setShowTooltip(!showTooltip);
      spanProps.ref = ref;
    }
    return spanProps;
  };

  const renderMore = (tag, onClear, tags) => {
    return tag.more ? (
      <>
        <i className="svg-ico">
          <PlusTagIcon />
        </i>
        <Tooltip
          tags={tags}
          onClear={onClear}
          showTooltip={showTooltip}
          keys={keys}
        />
      </>
    ) : ( tag.tag_id !== 'custom' ? <i className={`svg-ico`} onClick={() => onClear(tag)}><ClearIcon /></i> : ''
      
    );
  };

  return (
    <span {...populateSpanProps()}>
      <em>{tag[keys[1]]}</em>
      {renderMore(tag, onClear, tags)}
    </span>
  );
};

export default TagItem;
