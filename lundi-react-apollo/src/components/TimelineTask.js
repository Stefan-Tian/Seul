import React, { Component } from "react";
import moment from "moment";

class TimelineTask extends Component {
  render() {
    const dates = this.props.dates.map(date =>
      moment(date.toString(), "YYYYMMDD").utcOffset(12)
    );
    const minTaskDate = moment.min(dates).clone();
    let diff = minTaskDate.diff(this.props.min, "days");
    diff = diff ? diff + 1 : diff;
    if (
      minTaskDate.format("YYYYMMDD") !== this.props.min.format("YYYYMMDD") &&
      minTaskDate.diff(this.props.min, "days") === 0
    ) {
      diff = 1;
    }
    let spaces = [];
    for (let i = 0; i < diff; i++) {
      spaces.push("empty");
    }
    spaces.push(...this.props.dates);
    // now we have the space a task should span in the timeline
    return (
      <div className="timeline-calendar-task">
        <span
          style={{ width: `${8 * diff}rem` }}
          className="timeline-calendar-task__empty"
        >
          empty
        </span>
        <div
          style={{ width: `${8 * dates.length}rem` }}
          className="timeline-calendar-task__name"
        >
          <span>{this.props.task}</span>
        </div>
      </div>
    );
  }
}

export default TimelineTask;
