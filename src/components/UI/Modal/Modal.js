import React from "react";
import HeaderModel from './HeaderModel';
import FooterModel from './FooterModel';
import ContentModel from './ContentModel';

const Modal = ({ 
  title,
  show,
  primaryButtonTitle,
  primaryButtonClick,
  secondaryButtonTitle,
  secondaryButtonClick,
  children
}) => {

  return (
    <div className={`fixed flex justify-center items-center ${show === true ? 'panel-block' : 'hidden'}`}>
      <div className="absolute bg-black opacity-40 overlay"></div>
      <div className="modalbox-wrapper absolute">
          <div className="">  
            <HeaderModel title={title} />
            <ContentModel content={children} />
            <FooterModel primaryButtonTitle={primaryButtonTitle} primaryButtonClick={primaryButtonClick} secondaryButtonClick={secondaryButtonClick} secondaryButtonTitle={secondaryButtonTitle} />   
          </div> 
      </div> 
    </div>
  );
};

export default Modal;
