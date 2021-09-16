import React from "react";
import { ReactComponent as LogoSvg } from "../../../assets/svgs/logoIcon.svg";

const Logo = ({ classes }) => {
  return (
    <em className={`svg-ico ${classes}`}>
      <LogoSvg />
    </em>
  );
};

export default Logo;
