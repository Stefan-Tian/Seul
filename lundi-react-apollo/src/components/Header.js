import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AUTH_TOKEN } from "../constants";

class Header extends Component {
  render() {
    const authToken = localStorage.getItem(AUTH_TOKEN);
    return (
      <header>
        <Link to="/">Donezo</Link>
        {authToken ? (
          <div
            onClick={() => {
              localStorage.removeItem(AUTH_TOKEN);
              this.props.history.push("/");
            }}
          >
            logout
          </div>
        ) : (
          <Link to="/login">login</Link>
        )}
      </header>
    );
  }
}

export default withRouter(Header);
