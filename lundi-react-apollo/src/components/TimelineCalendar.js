import React, { Component } from "react";
import moment from "moment";
import TimelineRange from "./TimelineRange";
import TimelineTask from "./TimelineTask";

class TimelineCalendar extends Component {
  render() {
    let taskDurations = [];
    let projects = [];
    projects = this.props.projects.map(project => [...project.todos]);
    projects = [...projects[0], ...projects[1]];
    projects.map(todo => {
      if (todo.startDate && todo.endDate) {
        const start = moment(todo.startDate);
        const end = moment(todo.endDate);
        const name = todo.name;
        taskDurations.push({ start, end, name });
      } else {
        taskDurations.push(null);
      }
    });

    const startDates = taskDurations
      .map(task => (task === null ? null : task.start))
      .filter(date => date != null);
    const endDates = taskDurations
      .map(task => (task === null ? null : task.end))
      .filter(date => date != null);

    // subtract two dates and map every date between them
    const numOfDays = moment.max(endDates).diff(moment.min(startDates), "days");
    // this line is super important, without the clone method, it's just shallow copy
    const min = moment.min(startDates).clone();
    let dateRange = [parseInt(min.format("YYYYMMDD"))];
    for (let i = 0; i < numOfDays; i++) {
      const anotherDate = parseInt(min.add(1, "d").format("YYYYMMDD"));
      dateRange.push(anotherDate);
    }

    let taskDurationAllProject = [];
    taskDurationAllProject = taskDurations.filter(task => task !== null);
    taskDurationAllProject = taskDurationAllProject.map(task => {
      const days = task.end.diff(task.start, "days");
      const min = task.start.clone();
      let range = [parseInt(min.format("YYYYMMDD"))];
      let day = "";
      for (let i = 0; i < days; i++) {
        day = parseInt(min.add(1, "d").format("YYYYMMDD"));
        range.push(day);
      }
      return [range, task.name];
    });

    return (
      <div className="timeline-calendar-container">
        <div className="timeline-calendar-dates-container">
          {dateRange.map(date => <TimelineRange key={date} date={date} />)}
        </div>
        <div className="timeline-calendar-tasks-container">
          {taskDurationAllProject.map(task => (
            <TimelineTask
              key={task[1]}
              dates={task[0]}
              task={task[1]}
              min={moment.min(startDates)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default TimelineCalendar;
