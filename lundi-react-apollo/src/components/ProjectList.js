import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Project from "./Project";
import CreateProject from "./CreateProject";
import Sidebar from "./Sidebar";
import Header from "./Header";

class ProjectList extends Component {
  state = {
    refreshList: false,
    keyword: ""
  };

  render() {
    if (this.props.projectsQuery && this.props.projectsQuery.loading) {
      return <div>Loading</div>;
    }

    if (this.props.projectsQuery && this.props.projectsQuery.error) {
      console.log(this.props.projectsQuery.error);
    }

    let projectsToRender = this.props.projectsQuery.projects;
    projectsToRender = this.filterProject(this.state.keyword);

    return (
      <div className="project-list">
        <Sidebar
          keyword={this.state.keyword}
          onKeywordChange={this.onKeywordChange}
          projects={projectsToRender}
        />
        <div className="project-list__content">
          <Header />
          <div className="project-list__content-projects">
            <CreateProject />
            {projectsToRender.map(project => (
              <Project key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  onKeywordChange = e => this.setState({ keyword: e.target.value });

  filterProject = keyword =>
    this.props.projectsQuery.projects.filter(({ name }) =>
      name.toLowerCase().includes(keyword)
    );
}

export const PROJECTS_QUERY = gql`
  query ProjectsQuery {
    projects {
      id
      name
      description
      todos {
        id
        name
        status
        priority
        startDate
        endDate
        project {
          id
        }
      }
    }
  }
`;

export default graphql(PROJECTS_QUERY, { name: "projectsQuery" })(ProjectList);
