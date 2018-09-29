import React from "react";
import { Route, Redirect } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

const PrivateRoute = ({ component: Component, ...rest , currentUser}) => {
  if (currentUser && currentUser.loading) {
    return <div>Wait a sec...</div>;
  }

  return (
    <Route
      {...rest}
      component={props => (currentUser.currentUser ? <Component {...props} /> : <Redirect to="/" />)}
    />
  );
};

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser
  }
`;

export default graphql(CURRENT_USER, { name: "currentUser"})(PrivateRoute);
