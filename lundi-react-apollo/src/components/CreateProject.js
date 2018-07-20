import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { PROJECTS_QUERY } from "./ProjectList";
import Spinning from "./Spinning";

class CreateProject extends Component {
  state = {
    name: "",
    description: "",
    creating: ""
  };

  render() {
    return (
      <div className="create-project">
        <input
          autoFocus
          className="create-project__input"
          value={this.state.name}
          onChange={e => this.setState({ name: e.target.value })}
          type="text"
          placeholder="Enter a new project name"
        />
        <div>
          {this.state.name ? (
            this.state.creating ? (
              <Spinning />
            ) : (
              <svg
                className="icon-add create-todo__btn"
                onClick={() => this._createProject()}
              >
                <use xlinkHref="symbols.svg#icon-plus" />
              </svg>
            )
          ) : (
            undefined
          )}
        </div>
      </div>
    );
  }

  _createProject = async () => {
    const { name } = this.state;
    this.setState(prevState =>
      this.setState({ creating: !prevState.creating })
    );
    await this.props.createProject({
      variables: {
        name
      },
      update: (store, { data: { createProject } }) => {
        const data = store.readQuery({ query: PROJECTS_QUERY });
        data.projects.push(createProject);
        store.writeQuery({
          query: PROJECTS_QUERY,
          data
        });
      }
    });
    this.setState(prevState =>
      this.setState({ creating: !prevState.creating })
    );
    this.setState({ name: "" });
  };
}

const CREATE_PROJECT = gql`
  mutation CreateProject($name: String!) {
    createProject(name: $name) {
      id
      name
      description
      todos {
        id
        name
      }
    }
  }
`;

export default graphql(CREATE_PROJECT, { name: "createProject" })(
  CreateProject
);
