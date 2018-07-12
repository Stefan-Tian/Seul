import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class CreateTodo extends Component {
  state = {
    name: ""
  };

  render() {
    return (
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
    await this.props.createTodo({
      variables: {
        name,
        projectId
      },
      refetchQueries: [
        {
          query: gql`
            query ProjectsQuery {
              projects {
                id
                name
                description
                todos {
                  id
                  name
                  status
                  priority
                  deadline
                }
              }
            }
          `
        }
      ]
    });
    this.setState({ name: "" });
  };
}

const CREATE_TODO = gql`
  mutation CreateTodo($name: String!, $projectId: String!) {
    createTodo(name: $name, projectId: $projectId) {
      id
      name
      deadline
      status
      priority
    }
  }
`;

export default graphql(CREATE_TODO, { name: "createTodo" })(CreateTodo);
