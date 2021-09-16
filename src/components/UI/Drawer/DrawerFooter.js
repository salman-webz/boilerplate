import React from "react";

const DrawerFooter = ({ yesHandler, closeHandler, showFooter = true, isButtonEnabled }) => {
  const renderYesHandler =
    yesHandler.showInFooter !== false ? (
      <a
        onClick={e => {
          e.preventDefault();
          yesHandler.handler();
        }}
        href="/#"
        className={`anas btn-primary btn mr-10 ${isButtonEnabled === false ? 'deadLink' : ''}`}
      >
        {yesHandler.label}
      </a>
    ) : null;

  const renderCloseHandler =
    closeHandler.showInFooter !== false ? (
      <a
        onClick={e => {
          e.preventDefault();
          closeHandler.handler();
        }}
        href="/#"
        className="btn-primary btn mr-10"
      >
        {closeHandler.label}
      </a>
    ) : null;

  return (
    <>
      {showFooter ? (
        <div className="panelFooter">
          <div className="row">
            {showFooter ? (
              <>
                {renderYesHandler}
                {renderCloseHandler}
              </>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default DrawerFooter;
