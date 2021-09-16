import React from "react";
import { Route, Redirect } from "react-router-dom";


const defaultProps = {
  restricted: false,
  redirect: "/welcome",
  isAuthenticated: false
};

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  redirect: pathname,
  restricted,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated && !restricted ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname }} />
        )
      }
    />
  );
};

PrivateRoute.defaultProps = defaultProps;

export default PrivateRoute;