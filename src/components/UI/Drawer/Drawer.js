import React from "react";
import { useSelector } from "react-redux";
import DrawerHead from "./DrawerHead";
import DrawerBody from "./DrawerBody";
import DrawerFooter from "./DrawerFooter";
import Backdrop from "../Backdrop/Backdrop";

const Drawer = ({
  open,
  closeHandler,
  headerTitle,
  yesHandler,
  showFooter,
  children,
  isButtonEnabled
}) => {
  
  const drawerState = useSelector(state => state.drawer);
  Object.keys(drawerState).every((k) => !drawerState[k]) 
    ? document.body.classList.remove("oh") 
    : document.body.classList.add("oh")

  return (
    <>
      <div className={`panelWrapper ${open ? "active" : ""} `}>
        <DrawerHead title={headerTitle} onCloseHandler={closeHandler.handler} />
        <DrawerBody content={children} />
        <DrawerFooter
          closeHandler={closeHandler}
          yesHandler={yesHandler}
          showFooter={showFooter}
          isButtonEnabled={isButtonEnabled}
        />
      </div>
      {open ? <Backdrop show={true} /> : null}
    </>
  );
};

export default Drawer;
