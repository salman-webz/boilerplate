import React, { useState, useEffect, useRef } from "react";
import { ReactComponent as RightArrowIcon } from "../../../../../../assets/svgs/rightArrowIcon.svg";

const PackageTooltip = ({ moreTags }) => {
  const [open, setOpen] = useState(false);
  const colors = ['green', 'pink', 'blue'];

  useEffect(() => {
    const clickHandler = (e) => {
      if (ref && ref.current && ref.current.contains(e.target)) {
        return;
      } else setOpen(false);
    };

    document.body.addEventListener("click", clickHandler);

    return () => {
      document.body.removeEventListener("click", clickHandler);
    };
  }, []);

  const ref = useRef();

  return (
    <div className={`toolTipBtn ${open ? "active" : ""}`} ref={ref}>
      <i
        className="svg-ico"
        data-svg="clearTagIco"
        onClick={_ => setOpen(!open)}
      >
        <RightArrowIcon />
      </i>
      <div data-dir="right" className="toolTipDiv">
        <ul>
          {moreTags.map((tag, i) => {
            return (
              <li key={i}>
                <em className={`color-${colors[i % colors.length]}`}>{tag}</em>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PackageTooltip;
