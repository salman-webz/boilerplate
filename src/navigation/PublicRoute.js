import React from "react";
import { Route, Redirect } from "react-router-dom";

const defaultProps = {
  restricted: false,
  redirect: "/"
};

const PublicRoute = ({
  component: Component,
  redirect: pathname,
  restricted,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props => 
        restricted ? (
          <Redirect to={{ pathname: pathname }} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

PublicRoute.defaultProps = defaultProps;

export default PublicRoute;
