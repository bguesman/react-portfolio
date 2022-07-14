import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './project-examples.css';

import ProjectExamplesHeader from "./ProjectExamplesHeader";
import ProjectEx from "./ProjectEx";

import * as Logging from '../logging/Logging';

class ProjectExamples extends Component {
  render() {
    return (
      <div className="project-examples-container">
        <ProjectExamplesHeader/>
        <ProjectEx
          colorScheme={"dark"}
          orientation={"left"}
          title={"Expanse"}
          subtitle={"CREATOR"}
          description={"Reimagining what a procedural sky system can do, and how it does it."}
          openModal={() => this.props.setModal("Expanse")}
          setCursorDisplay={this.props.setCursorDisplay}
        />
        <ProjectEx
          colorScheme={"light"}
          orientation={"right"}
          title={"Drivesim"}
          subtitle={"DEVELOPER"}
          description={"A virtual playground for autonomous agents, built in NVIDIA Omniverse."}
          openModal={() => this.props.setModal("DRIVE Sim")}
          setCursorDisplay={this.props.setCursorDisplay}
        />
        <ProjectEx
          colorScheme={"dark"}
          orientation={"left"}
          title={"Modern Warfare"}
          subtitle={"AUDIO INTERACTION DESIGNER"}
          description={"Building user-centered, immersive sound propagation systems."}
          openModal={() => this.props.setModal("Modern Warfare")}
          setCursorDisplay={this.props.setCursorDisplay}
        />
      </div>
    );
  }
}

export default ProjectExamples;
