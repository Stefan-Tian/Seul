import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";

class Login extends Component {
  state = {
    login: true,
    email: "",
    password: "",
    name: ""
  };

  render() {
    return (
      <div className="login--container">
        <div className="login__title">
          {this.state.login ? "sign in" : "create an account"}
        </div>
        <div className="login-fields--container">
          {!this.state.login && (
            <div className="login-fields--single-field">
              <span>Your Name</span>
              <input
                type="text"
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                placeholder="name"
              />
            </div>
          )}
          <div className="login-fields--single-field">
            <span>Your Email</span>
            <input
              type="text"
              value={this.state.email}
              onChange={e => this.setState({ email: e.target.value })}
              placeholder="email"
            />
          </div>
          <div className="login-fields--single-field">
            <span>Your Password</span>
            <input
              type="password"
              value={this.state.password}
              onChange={e => this.setState({ password: e.target.value })}
              placeholder="password"
            />
          </div>
        </div>
        <div className="login-fields--btns">
          <button
            className="login-fields--btns__confirm"
            onClick={() => this._confirm()}
          >
            {this.state.login ? "sign in" : "create an account"}
          </button>
          <div
            className="login-fields--btns__switch"
            onClick={() => this.setState({ login: !this.state.login })}
          >
            {this.state.login
              ? "need to create an account?"
              : "already have an account?"}
          </div>
        </div>
      </div>
    );
  }

  _confirm = async () => {
    const { name, email, password } = this.state;
    if (this.state.login) {
      await this.props.loginMutation({
        variables: {
          email,
          password
        },
        update: (store, { data: { login } }) => {
          const data = store.readQuery({ query: CURRENT_USER });
          data.currentUser = login.user.id;
          store.writeQuery({
            query: CURRENT_USER,
            data
          });
        }
      });
      this.props.history.push("/projects");
    } else {
      await this.props.signupMutation({
        variables: {
          name,
          email,
          password
        },
        update: (store, { data: { login } }) => {
          const data = store.readQuery({ query: CURRENT_USER });
          data.currentUser = login.user.id;
          store.writeQuery({
            query: CURRENT_USER,
            data
          });
        }
      });
      this.props.history.push("/projects");
    }
  };
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      user {
        id
      }
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
      }
    }
  }
`;

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser
  }
`;

export default compose(
  withRouter,
  graphql(SIGNUP_MUTATION, { name: "signupMutation" }),
  graphql(LOGIN_MUTATION, { name: "loginMutation" })
)(Login);
