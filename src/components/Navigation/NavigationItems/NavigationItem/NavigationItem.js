import React from "react";
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const NavigationItem = (props) => {
  const dispatch = useDispatch();
  const { item, onSelection } = props;
  const { icon: Icon, path } = item;
  return (
    <li className="mb-15 row">
      <NavLink
        aria-current="page"
        className={`row ${!!item.divider && item.divider} ${!!item.disabled && 'deadLink'}`}
        activeClassName="active"
        exact
        onClick={() => { onSelection(item); dispatch() }}
        to={path}
      >
        <em className="svg-ico">
          <Icon />
        </em>
      </NavLink>
    </li>
  );
};

export default NavigationItem;
