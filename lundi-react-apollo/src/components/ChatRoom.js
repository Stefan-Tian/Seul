import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import gql from "graphql-tag";
import Spinning from "./Spinning";

class ChatRoom extends Component {
  state = {
    message: ""
  };
  render() {
    // the query will start only when corresponding todo is clicked
    if (this.props.todoQuery && this.props.todoQuery.loading) {
      return (
        <div className="chat-room">
          <div className="chat-room__content">
            <div className="chat-room__content__spinning">
              <Spinning />
            </div>
          </div>
        </div>
      );
    }

    if (this.props.todoQuery && this.props.todoQuery.error) {
      console.log(this.props.todoQuery.error);
    }

    const messagesToRender = this.props.todoQuery.todo.messages;
    return (
      <div className="chat-room">
        <div className="chat-room__content">
          <span className="chat-room__content__title">Messages from you</span>
          <svg onClick={() => this.props.toggleChat()} className="icon">
            <use xlinkHref="symbols.svg#icon-cross" />
          </svg>
          <div className="chat-room__content__chat">
            {messagesToRender.length > 0 ? (
              messagesToRender.map(({ message }) => (
                <span
                  className="chat-room__content__chat__message"
                  key={message}
                >
                  {message}
                </span>
              ))
            ) : (
              <span className="chat-room__encouragement">
                communication is the key to success, so don't be shy and
                initiate a conversation with yourelf !
              </span>
            )}
          </div>
          <div className="chat-room__content__container">
            <textarea
              className="chat-room__content__input"
              placeholder="send yourself a message"
              value={this.state.message}
              onChange={e => this.setState({ message: e.target.value })}
            />
            {this.state.message.length > 0 ? (
              <svg
                onClick={() => this._createMessage()}
                className="icon chat-room__content__send"
              >
                <use xlinkHref="symbols.svg#icon-paperplane" />
              </svg>
            ) : (
              undefined
            )}
          </div>
        </div>
      </div>
    );
  }

  _createMessage = async () => {
    const { message } = this.state;
    const { todoId } = this.props;

    await this.props.createMessage({
      variables: {
        message,
        todoId
      },
      update: (store, { data: { createMessage } }) => {
        const data = store.readQuery({
          query: TODO_QUERY,
          variables: { id: this.props.todoId }
        });

        data.todo.messages.push(createMessage);
        store.writeQuery({
          query: TODO_QUERY,
          data
        });
      }
    });
    this.setState({ message: "" });
  };
}

const CREATE_MESSAGE = gql`
  mutation CreateMessage($message: String!, $todoId: String!) {
    createMessage(message: $message, todoId: $todoId) {
      message
    }
  }
`;

const TODO_QUERY = gql`
  query TodoQuery($id: String!) {
    todo(id: $id) {
      id
      messages {
        message
      }
    }
  }
`;

export default compose(
  graphql(CREATE_MESSAGE, { name: "createMessage" }),
  graphql(TODO_QUERY, {
    name: "todoQuery",
    options: props => ({ variables: { id: props.todoId } })
  })
)(ChatRoom);
