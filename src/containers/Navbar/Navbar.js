import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { navigationChange } from "../../store/actions";
import NavigationItems from "../../components/Navigation/NavigationItems/NavigationItems";

const Navbar = () => {
  const navigation = useSelector(state => state.navigation);
  const dispatch = useDispatch();
  return (
    <nav className="bg-blue pt-80">
      <NavigationItems
        items={navigation.items}
        onSelection={item => dispatch(navigationChange(item))}
      />
    </nav>
  );
};

export default Navbar;
