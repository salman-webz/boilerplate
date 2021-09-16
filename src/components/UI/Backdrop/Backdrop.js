import React from "react";
import ReactDom from "react-dom";
import { closeAllDrawer, onPackageSelection, updatePackages, toggleExportAll } from "../../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const Backdrop = ({ show }) => {

  const dispatch = useDispatch();

  const { packages = [] } = useSelector(state => state.package);
  const { showPackageViewDetail, showAddTag } = useSelector(state => state.drawer);

  const reset = () => {
    dispatch(closeAllDrawer());
    if(showPackageViewDetail === true || showAddTag === true){
      dispatch(onPackageSelection([]));
      dispatch(updatePackages([...packages.map(p => ({ ...p, selected: false }))]));
      dispatch(toggleExportAll(false));
    }
  }

  const handleKeyDown = (event) => {
    if(event.key === "Escape" && show){
      reset();
    }
  };

  

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return ReactDom.createPortal(
    <div className={`bodyDisable ${show ? "active" : ""} `} onClick={(e) => reset()}></div>,
    document.getElementById("backdrop")
  );
};

export default Backdrop;
