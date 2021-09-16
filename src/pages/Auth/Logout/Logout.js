import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { logout, removeAllFilters, setInitialState, setPaginationInitialState,} from "../../../store/actions";
const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
    dispatch(removeAllFilters());
    dispatch(setInitialState());
    dispatch(setPaginationInitialState());
    dispatch(setPaginationInitialState());
    // dispatch(setImportInitialState());
    // dispatch(dashboardInitialState());
    
    if(localStorage.automsg){
      //dispatch(toggleToaster({name: 'error',show: 'true',msg: "Expired token. Please login to get a new token."}));
    }
    
  }, []);
  return <Redirect to="/welcome" />;
};

export default Logout;
