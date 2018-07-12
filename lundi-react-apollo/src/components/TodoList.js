import React, { Component } from "react";
import CreateTodo from "./CreateTodo";
import Todo from "./Todo";

class TodoList extends Component {
  deleteTodoFromProps = id =>
    this.props.project.todos.filter(todo => todo.id !== id);

  render() {
    return (
      <div className="todolist-container">
        {this.props.project.todos.length > 0 ? (
          <div className="todolist-title">
            <div className="todolist-title__name">Name</div>
            <div className="todolist-title__status">Status</div>
            <div className="todolist-title__priority">Priority</div>
            <div className="todolist-title__timeline">Timeline</div>
          </div>
        ) : (
          undefined
        )}
        <CreateTodo projectId={this.props.project.id} />
        {this.props.project.todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteFromList={this.deleteTodoFromProps}
          />
        ))}
      </div>
    );
  }
}

export default TodoList;
