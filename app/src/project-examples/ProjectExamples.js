import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './project-examples.css';

import ProjectExamplesHeader from "./ProjectExamplesHeader";
import ExpanseProjectEx from "./ExpanseProjectEx";
import DrivesimProjectEx from "./DrivesimProjectEx";
import MWProjectEx from "./MWProjectEx";

import * as Logging from '../logging/Logging';

class ProjectExamples extends Component {
  render() {
    return (
      <div className="project-examples-container">
        <ProjectExamplesHeader />
        <ExpanseProjectEx />
        <DrivesimProjectEx />
        <MWProjectEx />
      </div>
    );
  }
}

export default ProjectExamples;
