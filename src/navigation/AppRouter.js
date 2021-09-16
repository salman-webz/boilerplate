import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Router, Switch } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";

import { authCheckState } from "../store/actions";
import history from "../utils/history";

import Auth from "../pages/Auth/Auth";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Home/Dashboard/Dashboard";
import Logout from "../pages/Auth/Logout/Logout";
// import PageNotFound from "./PageNotFound";

const AppRouter = () => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const isAuthenticated = auth.token !== null;

  useEffect(() => {
    dispatch(authCheckState());
  }, []);

  const WrappedHome = () => (
    <Home>
      <Switch>
        <PublicRoute exact path="/" component={Dashboard}/>
        <PublicRoute exact path="/logout" component={Logout}/>
        <PublicRoute path="*" redirect="/" restricted={true} />
      </Switch>
    </Home>
  );

  return (
    <>
    <Router history={history}>
      <Switch>
        <PublicRoute exact path="/login" component={Auth} />
        <PrivateRoute isAuthenticated={isAuthenticated} redirect="/login">
          <WrappedHome />
        </PrivateRoute>
      </Switch>
    </Router>
    </>
  );
};

export default AppRouter;
