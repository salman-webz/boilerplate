import React from "react";

const FooterModel = ({primaryButtonTitle,secondaryButtonTitle,primaryButtonClick,secondaryButtonClick}) => {
    return (
        <div className="panel-footer">
            <div className="panel-footer-wrapper align-right">
                <button className="primary-button capitalize" onClick={(e) => primaryButtonClick()}>
                    {primaryButtonTitle}
                </button>
                <button className="secoundry-button capitalize" onClick={(e) => secondaryButtonClick()}>{secondaryButtonTitle}</button>
            </div>
        </div>
    )
}
export default FooterModel;