import React from "react";
import { Link } from 'react-router-dom';
import Loader from "../Loader/Loader";


export const TagTileBig = ({value, Icon, Title, loader, handleClick}) => {

  return (
    <span className="row pl bg-gray3 pt-10 pb-10 pl-20 pr-20 relative tileBig pointer" onClick={handleClick}>
        <Loader isLoading={loader} />
        <em className="pl mr-15 mt-25"><Icon/></em>
        <span className="pl ellipses">
          <span className="row mt-5 fs-14 color-gray2">{Title}</span>
          <span className="row fs-32 mt-5 fw-500 color-black2 ellipses">{value}</span>
        </span>
    </span>
  );
};

export const TagTileSmall = ({item, handleClick}) => {
  const tagsName = item.label.split(' ');
  return (
    <span onClick={(e) => handleClick(item.redirection)} className="pointer row pl bg-gray3 pt-15 pb-15 pr-20 pl-20 tag-tile">
        <span className="pl fs-12 tag ellipses mb-10">{`${tagsName[0]}`}</span>
        {tagsName[2] ? <span className="pl mb-10"><span className="pl fs-12 ml-5 mr-5 mt-3 color-black4">{`&`}</span><span className="pl fs-12 tag ellipses">{`${tagsName[2]}`}</span></span> : ''}
        {tagsName[4] && tagsName[4] !== '&'  ? <span className="pl mb-10"><span className="pl fs-12 ml-5 mr-5 mt-3 color-black4">{`&`}</span><span className="pl fs-12 tag ellipses">{`${tagsName[4] }`}</span></span> : ''}
        {tagsName[5] ? <span className="pl mb-10"><span className="pl fs-12 ml-5 mr-5 mt-3 color-black4">{`&`}</span><span className="pl fs-12 tag ellipses">{tagsName[6]}</span></span> : ''}
        <span className="full fs-21 color-black2 ellipses">{item.value}</span>
    </span>
  );
};