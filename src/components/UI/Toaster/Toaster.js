import React, { useEffect } from "react";
import ReactDom from 'react-dom';
import { useDispatch } from "react-redux";
import toast from '../../../store/actions/toaster';

//ICONS
import { ReactComponent as SuccessSvg } from "../../../assets/images/svg/Notification_Success.svg";
import { ReactComponent as ErrorSvg } from "../../../assets/images/svg/Notification_error.svg";
import { ReactComponent as CrossIcon } from "../../../assets/images/svg/cross.svg";


const Toaster = ({data}) => {

  //var timeOut = '';
  const dispatch = useDispatch();

  const closeToaster = () => {
    dispatch(toast());
  }

  // if(data.name === 'success' || data.name === 'error'){
  //   //clearInterval(timeOut);
  //   let time = 8000;
  //   timeOut =  setTimeout(function(){ dispatch(toast({})) }, time);
  // }

  // useEffect(() => {
  //   clearInterval(timeOut);
  // }, [data.name]); 
  
  return ReactDom.createPortal(
    <div className={`toaster ${data.name} ${data.active && 'active'}`}>
      <em className="bg-white svg-ico align-items-center flex">{data.name === 'error' ?  <ErrorSvg/> :  data.name === 'success' && <SuccessSvg/> }</em>
      <em className="fs-12 fw-400 flex align-items-center toaster-msg"><span className="">{data.msg}</span></em>
      <em className="svg-ico align-items-center flex pointer pr-15" onClick={closeToaster}><CrossIcon /></em>
    </div>,
    document.getElementById('toasterWrap')
  )
}

export default Toaster;
