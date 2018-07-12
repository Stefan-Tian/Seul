import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import Project from "./Project";
import CreateProject from "./CreateProject";

class ProjectList extends Component {
  state = {
    refreshList: false
  };

  render() {
    if (this.props.projectsQuery && this.props.projectsQuery.loading) {
      return <div>Loading</div>;
    }

    if (this.props.projectsQuery && this.props.projectsQuery.error) {
      console.log(this.props.projectsQuery.error);
    }

    const projectsToRender = this.props.projectsQuery.projects;

    return (
      <div>
        <CreateProject />
        {projectsToRender.map(project => (
          <Project key={project.id} project={project} />
        ))}
      </div>
    );
  }
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
        deadline
      }
    }
  }
`;

export default graphql(PROJECTS_QUERY, { name: "projectsQuery" })(ProjectList);
