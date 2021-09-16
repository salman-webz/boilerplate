import React,  { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

const BreadCrumbs = () => {

    return<div className="breadcrumb-regEX">
                <ul className="breadcrumb">
                    <li><Link to="/">Dashboard</Link></li>
                    <li>Add Menu Script</li>
                </ul>
            </div>
}

export default BreadCrumbs;