import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import TodoList from "./TodoList";

class Project extends Component {
  state = {
    editTitle: false,
    editDescription: false,
    name: "",
    description: "",
    posting: false
  };
  onEditTitle = () =>
    this.setState(prevState => ({ editTitle: !prevState.editTitle }));

  onEditDescription = () =>
    this.setState(prevState => ({
      editDescription: !prevState.editDescription
    }));

  flipPostingStatus = () =>
    this.setState(prevState => ({
      posting: !prevState.posting
    }));

  render() {
    return (
      <div>
        {this.state.editTitle ? (
          <div>
            <input
              type="text"
              autoFocus
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              onBlur={() => this._updateTitle()}
              placeholder={this.props.project.name}
            />
          </div>
        ) : (
          <div>
            <h1>
              {this.state.posting // if the state.name is empty, remain the same
                ? this.state.name || this.props.project.name
                : this.props.project.name}
            </h1>
            <svg
              className="icon icon-pencil"
              onClick={() => this.onEditTitle()}
            >
              <use xlinkHref="symbols.svg#icon-edit-pencil" />
            </svg>
          </div>
        )}
        {this.props.project.description ? (
          this.state.editDescription ? (
            <div>
              <input
                type="text"
                autoFocus
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
                onBlur={() => this._updateDescription()}
                placeholder={this.props.project.description}
              />
            </div>
          ) : (
            <div>
              <h5>
                {this.state.posting
                  ? this.state.description || this.props.project.description
                  : this.props.project.description}
              </h5>
              <svg
                className="icon icon-pencil"
                onClick={() => this.onEditDescription()}
              >
                <use xlinkHref="symbols.svg#icon-edit-pencil" />
              </svg>
            </div>
          )
        ) : (
          <div>
            <input
              type="text"
              value={this.state.description}
              onChange={e => this.setState({ description: e.target.value })}
              onBlur={() => this._updateDescription()}
              placeholder="Add a description"
            />
          </div>
        )}
        <div>
          <TodoList project={this.props.project} />
        </div>
      </div>
    );
  }

  _updateTitle = async () => {
    const { name } = this.state;
    if (name.length > 0) {
      this.flipPostingStatus();
      this.onEditTitle();
      await this.props.updateProject({
        variables: {
          id: this.props.project.id,
          name
        }
      });
      this.flipPostingStatus();
      this.setState({ name: "" });
    } else {
      this.onEditTitle();
    }
  };

  _updateDescription = async () => {
    const { description } = this.state;
    if (description.length > 0) {
      this.flipPostingStatus();
      this.onEditDescription();
      await this.props.updateProject({
        variables: {
          id: this.props.project.id,
          description
        }
      });
      this.flipPostingStatus();
      this.setState({ description: "" });
    } else {
      this.onEditDescription();
    }
  };
}

const UPDATE_PROJECT = gql`
  mutation UpdateProject($id: String!, $name: String, $description: String) {
    updateProject(id: $id, name: $name, description: $description) {
      id
      name
      description
      todos {
        id
      }
    }
  }
`;

export default graphql(UPDATE_PROJECT, { name: "updateProject" })(Project);
