import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { PROJECTS_QUERY } from "./ProjectList";
import Spinning from "./Spinning";

class CreateTodo extends Component {
  state = {
    name: "",
    creating: false
  };

  render() {
    return this.state.creating ? (
      <div className="create-container create-spinning">
        <Spinning />
      </div>
    ) : (
      <div className="create-container">
        <div className="create-todo">
          <input
            className="create-todo__input"
            type="text"
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
            placeholder="Add a new task..."
          />
        </div>
        <div>
          {this.state.name ? (
            <svg
              className="icon-add create-todo__btn"
              onClick={() => this._createTodo()}
            >
              <use xlinkHref="symbols.svg#icon-plus" />
            </svg>
          ) : (
            undefined
          )}
        </div>
      </div>
    );
  }

  _createTodo = async () => {
    const { name } = this.state;
    const { projectId } = this.props;
    this.setState(prevState => ({ creating: !prevState.creating }));
    await this.props.createTodo({
      variables: {
        name,
        projectId
      },
      update: (store, { data: { createTodo } }) => {
        const data = store.readQuery({ query: PROJECTS_QUERY });
        data.projects.map(project => {
          if (project.id === this.props.projectId) {
            project.todos.push(createTodo);
          }
          return project;
        });
        store.writeQuery({
          query: PROJECTS_QUERY,
          data
        });
      }
    });
    this.setState(prevState => ({ creating: !prevState.creating }));
    this.setState({ name: "" });
  };
}

const CREATE_TODO = gql`
  mutation CreateTodo($name: String!, $projectId: String!) {
    createTodo(name: $name, projectId: $projectId) {
      id
      name
      startDate
      endDate
      status
      priority
      project {
        id
      }
    }
  }
`;

export default graphql(CREATE_TODO, { name: "createTodo" })(CreateTodo);
