import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return (
    <Route
      {...rest}
      component={props =>
        token ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
