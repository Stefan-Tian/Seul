import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AUTH_TOKEN } from "../constants";

const PublicRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return (
    <Route
      {...rest}
      component={props =>
        token ? <Redirect to="/projects" /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;
