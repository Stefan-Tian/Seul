import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import { PROJECTS_QUERY } from "./ProjectList";
import Spinning from "./Spinning";
import TimeField from "./TimeField";

class Todo extends Component {
  state = {
    name: "",
    status: "",
    priority: "",
    deadline: "",
    editName: false,
    editStatus: false,
    editPriority: false,
    editTimeline: false,
    posting: false,
    settingDate: false,
    colorOfStatus: "",
    colorOfPriority: "",
    deleting: false,
    startDate: null,
    endDate: null,
    focusedInput: null
  };

  onEditName = () =>
    this.setState(prevState => ({ editName: !prevState.editName }));

  onEditStatus = () =>
    this.setState(prevState => ({ editStatus: !prevState.editStatus }));

  onEditPriority = () =>
    this.setState(prevState => ({ editPriority: !prevState.editPriority }));

  onEditTimeline = () => {
    this.setState(prevState => ({ editTimeline: !prevState.editTimeline }));
  };

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
                className="edit-todo"
                type="text"
                autoFocus
                placeholder={this.props.todo.name}
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
                onBlur={() => this._updateName()}
              />
              <svg
                className="icon-checkmark"
                onClick={() => this._updateName()}
              >
                <use xlinkHref="symbols.svg#icon-checkmark" />
              </svg>
            </div>
          ) : (
            <div className="todo__name-layout">
              <span>
                {this.state.posting
                  ? this.state.name || this.props.todo.name
                  : this.props.todo.name}
              </span>
              <svg className="icon icon-edit" onClick={() => this.onEditName()}>
                <use xlinkHref="symbols.svg#icon-edit-pencil" />
              </svg>

              {this.state.deleting ? (
                <div className="delete-spinning">
                  <Spinning />
                </div>
              ) : (
                <svg
                  className="icon icon-trash"
                  onClick={() => this._deleteTodo()}
                >
                  <use xlinkHref="symbols.svg#icon-trash" />
                </svg>
              )}
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
                onChange={async e => {
                  switch (e.target.value) {
                    case "on hold":
                      await this.setState({
                        status: e.target.value,
                        colorOfStatus: "yellow"
                      });
                      break;
                    case "stuck":
                      await this.setState({
                        status: e.target.value,
                        colorOfStatus: "red"
                      });
                      break;
                    case "working on it":
                      await this.setState({
                        status: e.target.value,
                        colorOfStatus: "blue"
                      });
                      break;
                    case "done":
                      await this.setState({
                        status: e.target.value,
                        colorOfStatus: "sheen"
                      });
                      break;
                    default:
                      await this.setState({
                        status: e.target.value,
                        colorOfStatus: "grey"
                      });
                  }
                  this._updateStatus();
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
                className="icon icon-edit"
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
                className="icon icon-edit"
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
                onChange={async e => {
                  switch (e.target.value) {
                    case "High":
                      await this.setState({
                        priority: e.target.value,
                        colorOfPriority: "red"
                      });
                      break;
                    case "Medium":
                      await this.setState({
                        priority: e.target.value,
                        colorOfPriority: "blue"
                      });
                      break;
                    case "Low":
                      await this.setState({
                        priority: e.target.value,
                        colorOfPriority: "sheen"
                      });
                      break;
                    default:
                      await this.setState({
                        priority: e.target.value,
                        colorOfPriority: "grey"
                      });
                  }

                  this._updatePriority();
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
                className="icon icon-edit"
                onClick={() => this.onEditPriority()}
              >
                <use xlinkHref="symbols.svg#icon-edit-pencil" />
              </svg>
            </div>
          ) : (
            <div>
              <span>{this.props.todo.priority}</span>
              <svg
                className="icon icon-edit"
                onClick={() => this.onEditPriority()}
              >
                <use xlinkHref="symbols.svg#icon-edit-pencil" />
              </svg>
            </div>
          )}
        </section>
        <section className="todo__timeline">
          {this.state.editTimeline ? (
            <div>
              <DateRangePicker
                startDate={this.state.startDate}
                endDate={this.state.endDate}
                onDatesChange={({ startDate, endDate }) =>
                  this.setState({ startDate, endDate })
                }
                focusedInput={this.state.focusedInput}
                onFocusChange={focusedInput => this.setState({ focusedInput })}
              />
              <svg
                className="icon-timeline icon-checkmark"
                onClick={() => this._updateTimeline()}
              >
                <use xlinkHref="symbols.svg#icon-checkmark" />
              </svg>
            </div>
          ) : (
            <div className="todo__timeline-container">
              <TimeField
                startDate={
                  this.state.settingDate
                    ? this.state.startDate.format() || this.props.todo.startDate
                    : this.props.todo.startDate
                }
                endDate={
                  this.state.settingDate
                    ? this.state.endDate.format() || this.props.todo.endDate
                    : this.props.todo.endDate
                }
              />
              <svg
                className="icon icon-edit"
                onClick={() => this.onEditTimeline()}
              >
                <use xlinkHref="symbols.svg#icon-calendar" />
              </svg>
            </div>
          )}
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

  _updateTimeline = async () => {
    const { startDate, endDate } = this.state;
    if (startDate && endDate) {
      const { id } = this.props.todo;
      this.setState(prevState => ({ settingDate: !prevState.settingDate }));
      this.onEditTimeline();
      await this.props.updateTodo({
        variables: {
          id,
          startDate,
          endDate
        }
      });
      this.setState(prevState => ({ settingDate: !prevState.settingDate }));
      this.setState({ startDate: "", endDate: "" });
    } else {
      this.onEditTimeline();
    }
  };

  _deleteTodo = async () => {
    const { id } = this.props.todo;
    this.setState(prevState => ({ deleting: !prevState.deleting }));
    await this.props.deleteTodo({
      variables: { id },
      update: store => {
        const data = store.readQuery({ query: PROJECTS_QUERY });
        data.projects.map(project => {
          if (project.id === this.props.todo.project.id) {
            const todoIdArray = project.todos.map(todo => todo.id);
            project.todos.splice(todoIdArray.indexOf(id), 1);
          }
          return project;
        });
        store.writeQuery({
          query: PROJECTS_QUERY,
          data
        });
      }
    });
    this.setState(prevState => ({ deleting: !prevState.deleting }));
  };
}

const UPDATE_TODO = gql`
  mutation UpdateTodo(
    $id: String!
    $name: String
    $status: String
    $priority: String
    $startDate: String
    $endDate: String
  ) {
    updateTodo(
      id: $id
      name: $name
      status: $status
      priority: $priority
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      name
      status
      priority
      startDate
      endDate
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
