import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { client } from "../index";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";

class Header extends Component {
  render() {
    const { currentUser } = this.props.currentUser;
    return (
      <header className="header">
        <Link className="header__name" to="/">
          <img className="header__logo" src="/lundi-logo.png" alt="logo" />
          Seul
        </Link>
        {currentUser ? (
          <div
            className="header__log"
            onClick={() => {
              this.props.logout();
              this.props.history.push("/");
              client.resetStore();
            }}
          >
            logout
          </div>
        ) : (
          <Link className="header__log" to="/login">
            login
          </Link>
        )}
      </header>
    );
  }
}

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser
  }
`;

const LOG_OUT = gql`
  mutation Logout {
    logout
  }
`;

export default withRouter(
  compose(
    graphql(CURRENT_USER, { name: "currentUser" }),
    graphql(LOG_OUT, { name: "logout" })
  )(Header)
);
