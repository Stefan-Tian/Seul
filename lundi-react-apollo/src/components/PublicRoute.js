import React from "react";
import { Route, Redirect } from "react-router-dom";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

// just check if currentUser is true or false
// when logout, clear the session
const PublicRoute = ({ component: Component, ...rest, currentUser }) => {
  if (currentUser && currentUser.loading) {
    return <div>Wait a sec...</div>;
  }
  return (
    <Route
      {...rest}
      component={props =>
        currentUser.currentUser ? <Redirect to="/projects" /> : <Component {...props} />
      }
    />
  );
};

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser
  }
`;

export default graphql(CURRENT_USER, { name: "currentUser" })(PublicRoute);
