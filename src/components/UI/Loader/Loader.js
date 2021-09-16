import React from "react";

const Loader = ({ isLoading }) => {
  
  return (
    <div className="plzWait" style={{ display: isLoading ? "block" : "none" }}>
      <div className="lds-ripple">
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
