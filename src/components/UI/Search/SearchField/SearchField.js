import React, { useEffect, useRef } from "react";
import { reset } from "../../../../store/actions";
const SearchField = ({ Icon, onTermChange, term, label }) => {
  const ref = useRef();
  useEffect(() => {
    if (ref.current.value) {
      ref.current.value = "";
    }
  }, []);
  return (
    <>
      <em className="svg-ico">
        <Icon />
      </em>
      <input
        ref={ref}
        onChange={onTermChange}
        type="text"
        value={term}
        placeholder={label}
      />
    </>
  );
};

export default SearchField;
