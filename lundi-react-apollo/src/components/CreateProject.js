import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { PROJECTS_QUERY } from "./ProjectList";

class CreateProject extends Component {
  state = {
    name: "",
    description: ""
  };

  render() {
    return (
      <div>
        <div>
          <input
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            type="text"
            placeholder="Project Name"
          />
        </div>
        <button onClick={() => this._createProject()}>Add</button>
      </div>
    );
  }

  _createProject = async () => {
    const { name } = this.state;
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
        deadline
      }
    }
  }
`;

export default graphql(CREATE_PROJECT, { name: "createProject" })(
  CreateProject
);
