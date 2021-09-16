import React from "react";
import { ReactComponent as PanelCloseSvg } from "../../../assets/svgs/panelCloseIcon.svg";

const DrawerHead = ({ title, onCloseHandler }) => {
    return (
        <>
            <div className="panelHead row bg-white1">
                <h2 className="fs-18 fw-500 color-blue3">{title}</h2>
                <a href="/#" className="closePanel" onClick={e => {e.preventDefault(); onCloseHandler()}}>
                    <em className="svg-ico">
                        <PanelCloseSvg />
                    </em>
                </a>
            </div>
        </>
    );
};

export default DrawerHead;
