import React, { Component } from "react";

class TimelineRange extends Component {
  render() {
    const dateArr = this.props.date.toString().split("");
    const formattedDate = `${dateArr.slice(0, 4).join("")}-${dateArr
      .slice(4, 6)
      .join("")}-${dateArr.slice(6, 8).join("")}`;
    return <div className="timeline-calendar-date">{formattedDate}</div>;
  }
}

export default TimelineRange;
