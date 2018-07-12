import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { AUTH_TOKEN } from "../constants";

class Login extends Component {
  state = {
    login: true,
    email: "",
    password: "",
    name: ""
  };

  render() {
    return (
      <div>
        <div>
          {!this.state.login && (
            <input
              type="text"
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              placeholder="Your name"
            />
          )}
          <input
            type="text"
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
            placeholder="Your email"
          />
          <input
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value })}
            placeholder="Your password"
          />
        </div>
        <div>
          <div onClick={() => this._confirm()}>
            {this.state.login ? "login" : "create an account"}
          </div>
          <div onClick={() => this.setState({ login: !this.state.login })}>
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
      const result = await this.props.loginMutation({
        variables: {
          email,
          password
        }
      });
      const { token } = result.data.login;
      this._saveUserDate(token);
      this.props.history.push("/");
    } else {
      const result = await this.props.signupMutation({
        variables: {
          name,
          email,
          password
        }
      });
      const { token } = result.data.signup;
      this._saveUserDate(token);
      this.props.history.push("/");
    }
  };

  _saveUserDate = token => localStorage.setItem(AUTH_TOKEN, token);
}

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export default compose(
  graphql(SIGNUP_MUTATION, { name: "signupMutation" }),
  graphql(LOGIN_MUTATION, { name: "loginMutation" })
)(Login);
