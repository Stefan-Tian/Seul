import React, { Component } from "react";

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar">
        <span className="sidebar__content">
          <h3 className="sidebar__title">projects</h3>
          <input
            className="sidebar__search"
            type="text"
            value={this.props.keyword}
            placeholder="search..."
            onChange={this.props.onKeywordChange}
          />
          {this.props.projects ? (
            <ul className="sidebar_projects">
              {this.props.projects.map(project => (
                <li className="sidebar__project-name" key={project.id}>
                  {project.name}
                </li>
              ))}
            </ul>
          ) : null}
        </span>
      </div>
    );
  }
}

export default Sidebar;
