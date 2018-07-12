import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ProjectList from "./ProjectList";
import Header from "./Header";
import Login from "./Login";
import "../styles/App.css";

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={ProjectList} />
        </Switch>
      </div>
    );
  }
}

export default App;
