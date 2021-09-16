import React, { useEffect, useRef } from "react";
import PageSelectBoxHead from "./PageSelectBoxHead/PageSelectBoxHead";
import PageSelectBoxList from "./PageSelectBoxList/PageSelectBoxList";

const PageSelectBox = ({
  limit,
  onLimitSelect,
  limitRanges,
  isOpenSelectBox,
  toggleSelectBox
}) => {
  const ref = useRef();

  useEffect(() => {
    const clickHandler = e => {
      if (ref && ref.current && ref.current.contains(e.target)) {
        return;
      } else toggleSelectBox(false);
    };

    document.body.addEventListener("click", clickHandler);

    return () => {
      document.body.removeEventListener("click", clickHandler);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`fieldDiv half pl mb-20 relative hasIcon selectBox ${
        isOpenSelectBox ? "active" : ""
      }`}
    >
      <PageSelectBoxHead limit={limit} handleOpen={() => toggleSelectBox(!isOpenSelectBox)} />
      <PageSelectBoxList
        onLimitSelect={onLimitSelect}
        limitRanges={limitRanges}
      />
    </div>
  );
};

export default PageSelectBox;
