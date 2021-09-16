import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";



const renderNavBar = (items, onSelection) => {
  const user_role = localStorage.user && JSON.parse(localStorage.user) ? JSON.parse(localStorage.user).user_role : ""
  return items.map(item => {
    return (
      item.path === '/bulk_tags' && user_role === 0 ?
      <React.Fragment key={item.key}></React.Fragment>
       : <NavigationItem
       key={item.key}
       item={item}
       onSelection={onSelection}
     />
    );
  });
};

const NavigationItems = ({ items, onSelection }) => {
  return (
    <ul className="align-center">
      {renderNavBar(items, onSelection)}
    </ul>
  );
};

export default NavigationItems;
