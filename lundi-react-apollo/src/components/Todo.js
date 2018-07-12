import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { PROJECTS_QUERY } from "./ProjectList";

class Todo extends Component {
  state = {
    name: "",
    status: "",
    priority: "",
    deadline: "",
    editName: false,
    editStatus: false,
    editPriority: false,
    editDeadline: false,
    posting: false,
    colorOfStatus: "",
    colorOfPriority: ""
  };

  onEditName = () =>
    this.setState(prevState => ({ editName: !prevState.editName }));

  onEditStatus = () =>
    this.setState(prevState => ({ editStatus: !prevState.editStatus }));

  onEditPriority = () =>
    this.setState(prevState => ({ editPriority: !prevState.editPriority }));

  onEditDeadline = () =>
    this.setState(prevState => ({ editDeadline: !prevState.editDeadline }));

  flipPostingState = () =>
    this.setState(prevState => ({ posting: !prevState.posting }));

  render() {
    let statusColor, priorityColor;
    switch (this.props.todo.status) {
      case "on hold":
        statusColor = "yellow";
        break;
      case "stuck":
        statusColor = "red";
        break;
      case "working on it":
        statusColor = "blue";
        break;
      case "done":
        statusColor = "sheen";
        break;
      default:
        statusColor = "grey";
    }
    switch (this.props.todo.priority) {
      case "High":
        priorityColor = "red";
        break;
      case "Medium":
        priorityColor = "blue";
        break;
      case "Low":
        priorityColor = "sheen";
        break;
      default:
        priorityColor = "grey";
    }
    return (
      <section className="todo-container">
        <section className="todo__name">
          {this.state.editName ? (
            <div>
              <input
                type="text"
                autoFocus
                placeholder={this.props.todo.name}
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                onBlur={() => this._updateName()}
              />
            </div>
          ) : (
            <div>
              <span>
                {this.state.posting
                  ? this.state.name || this.props.todo.name
                  : this.props.todo.name}
              </span>
              <svg
                className="icon icon-pencil"
                onClick={() => this.onEditName()}
              >
                <use xlinkHref="symbols.svg#icon-edit-pencil" />
              </svg>
              <svg
                className="icon icon-trash"
                onClick={() => this._deleteTodo()}
              >
                <use xlinkHref="symbols.svg#icon-trash" />
              </svg>
            </div>
          )}
        </section>
        <section
          className={`todo__status ${
            this.state.colorOfStatus ? this.state.colorOfStatus : statusColor
          }`}
        >
          {this.state.editStatus ? (
            <div className="todo__status-dropdown">
              <select
                className={`todo-select ${
                  this.state.colorOfStatus
                    ? this.state.colorOfStatus
                    : statusColor
                }`}
                value={this.state.status}
                onChange={e => {
                  switch (e.target.value) {
                    case "on hold":
                      this.setState({
                        status: e.target.value,
                        colorOfStatus: "yellow"
                      });
                      break;
                    case "stuck":
                      this.setState({
                        status: e.target.value,
                        colorOfStatus: "red"
                      });
                      break;
                    case "working on it":
                      this.setState({
                        status: e.target.value,
                        colorOfStatus: "blue"
                      });
                      break;
                    case "done":
                      this.setState({
                        status: e.target.value,
                        colorOfStatus: "sheen"
                      });
                      break;
                    default:
                      this.setState({
                        status: e.target.value,
                        colorOfStatus: "grey"
                      });
                  }
                }}
              >
                <option value={this.props.todo.status}>
                  {this.props.todo.status}
                </option>
                <option value="working on it">working on it</option>
                <option value="on hold">on hold</option>
                <option value="stuck">stuck</option>
                <option value="done">done</option>
              </select>
              <svg
                className="icon-checkmark"
                onClick={() => this._updateStatus()}
              >
                <use xlinkHref="symbols.svg#icon-checkmark" />
              </svg>
            </div>
          ) : this.state.posting ? (
            <div className="todo__status-item">
              <span className="todo__status-item__word">
                {this.state.status || this.props.todo.status}
              </span>
              <svg
                className="icon icon-pencil"
                onClick={() => this.onEditStatus()}
              >
                <use xlinkHref="symbols.svg#icon-edit-pencil" />
              </svg>
            </div>
          ) : (
            <div className="todo__status-item">
              <span className="todo__status-item__word">
                {this.props.todo.status}
              </span>
              <svg
                className="icon icon-pencil"
                onClick={() => this.onEditStatus()}
              >
                <use xlinkHref="symbols.svg#icon-edit-pencil" />
              </svg>
            </div>
          )}
        </section>
        <section
          className={`todo__priority ${
            this.state.colorOfPriority
              ? this.state.colorOfPriority
              : priorityColor
          }`}
        >
          {this.state.editPriority ? (
            <div className="todo__priority">
              <select
                className={`todo-select ${
                  this.state.colorOfPriority
                    ? this.state.colorOfPriority
                    : priorityColor
                }`}
                value={this.state.priority}
                onChange={e => {
                  switch (e.target.value) {
                    case "High":
                      this.setState({
                        priority: e.target.value,
                        colorOfPriority: "red"
                      });
                      break;
                    case "Medium":
                      this.setState({
                        priority: e.target.value,
                        colorOfPriority: "blue"
                      });
                      break;
                    case "Low":
                      this.setState({
                        priority: e.target.value,
                        colorOfPriority: "sheen"
                      });
                      break;
                    default:
                      this.setState({
                        priority: e.target.value,
                        colorOfPriority: "grey"
                      });
                  }
                }}
              >
                <option value={this.props.todo.priority}>
                  {this.props.todo.priority}
                </option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <svg
                className="icon-checkmark"
                onClick={() => this._updatePriority()}
              >
                <use xlinkHref="symbols.svg#icon-checkmark" />
              </svg>
            </div>
          ) : this.state.posting ? (
            <div>
              <span>{this.state.priority || this.props.todo.priority}</span>
              <svg
                className="icon icon-pencil"
                onClick={() => this.onEditPriority()}
              >
                <use xlinkHref="symbols.svg#icon-edit-pencil" />
              </svg>
            </div>
          ) : (
            <div>
              <span>{this.props.todo.priority}</span>
              <svg
                className="icon icon-pencil"
                onClick={() => this.onEditPriority()}
              >
                <use xlinkHref="symbols.svg#icon-edit-pencil" />
              </svg>
            </div>
          )}
        </section>
        <section className="todo__timeline">
          {this.props.todo.deadline || "unset"}
        </section>
      </section>
    );
  }

  _updateName = async () => {
    const { name } = this.state;
    if (name.length > 0) {
      const { id } = this.props.todo;
      // before the request get to the server, turn the
      // text into the updated one
      this.flipPostingState();
      this.onEditName();
      await this.props.updateTodo({
        variables: {
          id,
          name
        }
      });
      // after the request, switch back to the data from the server
      this.flipPostingState();
      this.setState({ name: "" });
    } else {
      this.onEditName();
    }
  };

  _updateStatus = async () => {
    const { status } = this.state;
    if (status.length > 0) {
      const { id } = this.props.todo;
      this.flipPostingState();
      this.onEditStatus();
      await this.props.updateTodo({
        variables: {
          id,
          status
        }
      });
      this.setState({ colorOfStatus: "" });
      this.flipPostingState();
      this.setState({ status: "" });
    } else {
      this.onEditStatus();
    }
  };

  _updatePriority = async () => {
    const { priority } = this.state;
    if (priority.length > 0) {
      const { id } = this.props.todo;
      this.flipPostingState();
      this.onEditPriority();
      await this.props.updateTodo({
        variables: {
          id,
          priority
        }
      });
      this.setState({ colorOfPriority: "" });
      this.flipPostingState();
      this.setState({ priority: "" });
    } else {
      this.onEditPriority();
    }
  };

  _updateDeadline = async () => {
    const { deadline } = this.state;
    const { id } = this.props.todo;
    this.flipPostingState();
    this.onEditDeadline();
    await this.props.updateTodo({
      variables: {
        id,
        deadline
      }
    });
    this.flipPostingState();
    this.setState({ deadline: "" });
  };

  _deleteTodo = async () => {
    const { id } = this.props.todo;
    this.props.deleteFromList(id);
    await this.props.deleteTodo({
      variables: { id }
    });
  };
}

const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: String!
    $name: String
    $status: String
    $priority: String
    $deadline: DateTime
  ) {
    updateTodo(
      id: $id
      name: $name
      status: $status
      priority: $priority
      deadline: $deadline
    ) {
      id
      name
      status
      priority
      deadline
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($id: String!) {
    deleteTodo(id: $id) {
      id
    }
  }
`;

export default compose(
  graphql(UPDATE_TODO, { name: "updateTodo" }),
  graphql(DELETE_TODO, { name: "deleteTodo" })
)(Todo);
