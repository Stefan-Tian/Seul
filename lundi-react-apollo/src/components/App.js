import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ProjectList from "./ProjectList";
import Login from "./Login";
import Landing from "./Landing";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import "../styles/App.css";
import "react-dates/lib/css/_datepicker.css";

class App extends Component {
  render() {
    return (
      <div className="layout">
        <Switch>
          <PublicRoute exact path="/" component={Landing} />
          <PublicRoute exact path="/login" component={Login} />
          <PrivateRoute exact path="/projects" component={ProjectList} />
        </Switch>
      </div>
    );
  }
}

export default App;
