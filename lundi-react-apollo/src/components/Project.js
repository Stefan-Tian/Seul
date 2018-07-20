import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import TodoList from "./TodoList";
import Spinning from "./Spinning";
import { PROJECTS_QUERY } from "./ProjectList";

class Project extends Component {
  state = {
    editTitle: false,
    editDescription: false,
    name: "",
    description: "",
    posting: false,
    deleting: false
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
      <div className="project">
        {this.state.editTitle ? (
          <div className="project__name">
            <input
              className="project__name-input"
              type="text"
              autoFocus
              value={this.state.name}
              onChange={e => this.setState({ name: e.target.value })}
              onBlur={() => this._updateTitle()}
              placeholder={this.props.project.name}
            />
            {this.state.name ? (
              <svg
                className="icon-checkmark project__name-done"
                onClick={() => this._updateTitle()}
              >
                <use xlinkHref="symbols.svg#icon-checkmark" />
              </svg>
            ) : (
              undefined
            )}
          </div>
        ) : (
          <div className="project__name">
            <h1 className="project__name-text">
              {this.state.posting // if the state.name is empty, remain the same
                ? this.state.name || this.props.project.name
                : this.props.project.name}
            </h1>
            <svg
              className="icon icon-pencil project__name-btn"
              onClick={() => this.onEditTitle()}
            >
              <use xlinkHref="symbols.svg#icon-edit-pencil" />
            </svg>
            {this.state.deleting ? (
              <div className="delete-spinning">
                <Spinning />
              </div>
            ) : (
              <svg
                className="icon project__name-btn"
                onClick={() => this._deleteProject()}
              >
                <use xlinkHref="symbols.svg#icon-trash" />
              </svg>
            )}
          </div>
        )}
        {this.props.project.description ? (
          this.state.editDescription ? (
            <div className="project__description">
              <input
                className="project__description-input"
                type="text"
                autoFocus
                value={this.state.description}
                onChange={e => this.setState({ description: e.target.value })}
                onBlur={() => this._updateDescription()}
                placeholder={this.props.project.description}
              />
            </div>
          ) : (
            <div className="project__description">
              <h5 className="project__description-text">
                {this.state.posting
                  ? this.state.description || this.props.project.description
                  : this.props.project.description}
              </h5>
              <svg
                className="icon icon-pencil project__description-btn"
                onClick={() => this.onEditDescription()}
              >
                <use xlinkHref="symbols.svg#icon-edit-pencil" />
              </svg>
            </div>
          )
        ) : (
          <div className="project__description">
            <input
              className="project__description-input"
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

  _deleteProject = async () => {
    const { id } = this.props.project;
    this.setState(prevState => ({ deleting: !prevState.deleting }));
    await this.props.deleteProject({
      variables: { id },
      update: store => {
        const data = store.readQuery({ query: PROJECTS_QUERY });
        const projectIds = data.projects.map(project => project.id);
        const index = projectIds.indexOf(id);
        data.projects.splice(index, 1);
        store.writeQuery({
          query: PROJECTS_QUERY,
          data
        });
      }
    });
    this.setState(prevState => ({ deleting: !prevState.deleting }));
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

const DELETE_PROJECT = gql`
  mutation DeleteProject($id: String!) {
    deleteProject(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(UPDATE_PROJECT, { name: "updateProject" }),
  graphql(DELETE_PROJECT, { name: "deleteProject" })
)(Project);
