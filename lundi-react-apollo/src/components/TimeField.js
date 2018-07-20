import React, { Component } from "react";

class TimeField extends Component {
  formatMonth = date => (date ? date.slice(5, 7) : "MM");
  formatDay = date => (date ? date.slice(8, 10) : "DD");

  render() {
    return (
      <span className="todo__timeline-date">
        {this.formatMonth(this.props.startDate)}/{this.formatDay(
          this.props.startDate
        )}{" "}
        - {this.formatMonth(this.props.endDate)}/{this.formatDay(
          this.props.endDate
        )}
      </span>
    );
  }
}

export default TimeField;
