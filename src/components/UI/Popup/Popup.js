import React from "react";
import ReactDom from "react-dom";
import Loader from "../Loader/Loader";

const Popup = ({ config, setConfig }) => {


  return ReactDom.createPortal(
    <div className={`popupWrap ${config.show ? 'active' : ''}`}>
      <div className="popupBackDrop" onClick={(e) => {setConfig({show: false, type: '', data: '', loader: true})}}></div>
      <div className="popup pb-20">
        <div className="row padding-20">
            <h1 className="fs-16 fw-700 row color-blue uppercase">view {config.type}</h1>
        </div>
        <div className="row popupBody pt-20 relative">
            <Loader isLoading={config.loader}/>
            <div className="fs-12 color-black3 pl-20 pr-20 pb-20 wordBreak">{config.type === 'meta' ? <pre>{config.data}</pre> : config.data }</div> 
        </div>  
      </div>     
    </div>,
    document.getElementById("popupWrap")
  );
};

export default Popup;
