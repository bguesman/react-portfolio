import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './project-examples.css';

import ProjectExamplesHeader from "./ProjectExamplesHeader";

import * as Logging from '../logging/Logging';

class ProjectExamples extends Component {
  render() {
    return (
      <div className="project-examples-container">
        <ProjectExamplesHeader />
        <div className="project-example-container">rarted shide</div>
      </div>
    );
  }
}

export default ProjectExamples;
