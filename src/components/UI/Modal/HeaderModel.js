import React from "react";
import { ReactComponent as CrossIcon } from "../../../assets/images/svg/cross.svg";

const HeaderModel = ({title}) => {
    return(
        <div className="panel-header flex justify-between">
            <div className="panel-heading uppercase">{title}</div>
            <button className="cross-icon">
                <em className="svg-ico svg-v-align4 mr-17" data-svg="crossIcom"><CrossIcon /></em>
            </button>
        </div>
            );
}
export default HeaderModel;