import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AUTH_TOKEN } from "../constants";
import { client } from "../index";

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <header className="header">
        <Link className="header__name" to="/">
          <img className="header__logo" src="/lundi-logo.png" alt="logo" />
          Seul
        </Link>
        {authToken ? (
          <div
            className="header__log"
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
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

export default withRouter(Header);
