import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './project-examples.css';
import expanse from './img/expanse-project-example.jpg';
import drivesim from './img/drivesim-project-example.jpg';
import mw from './img/mw-project-example.jpg';
import snowcrash from './img/snowcrash-project-example.jpg';

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
          img={expanse}
          description={"Reimagining what a procedural sky system can do, and how it does it."}
          openModal={() => this.props.setModal("Expanse")}
          setCursorDisplay={this.props.setCursorDisplay}
        />
        <ProjectEx
          colorScheme={"light"}
          orientation={"right"}
          title={"Drivesim"}
          subtitle={"DEVELOPER"}
          img={drivesim}
          description={"A virtual playground for autonomous agents, built in NVIDIA Omniverse."}
          openModal={() => this.props.setModal("DRIVE Sim")}
          setCursorDisplay={this.props.setCursorDisplay}
        />
        {/* <ProjectEx
          colorScheme={"dark"}
          orientation={"left"}
          title={"Modern Warfare"}
          subtitle={"AUDIO INTERACTION DESIGNER"}
          img={mw}
          description={"Building user-centered, immersive sound propagation systems."}
          openModal={() => this.props.setModal("Modern Warfare")}
          setCursorDisplay={this.props.setCursorDisplay}
        /> */}
        <ProjectEx
          colorScheme={"dark"}
          orientation={"left"}
          title={"SN0WCRASH"}
          subtitle={"Music Producer"}
          img={snowcrash}
          description={"Solo indie music project."}
          openModal={() => this.props.setModal("SN0WCRASH")}
          setCursorDisplay={this.props.setCursorDisplay}
        />
      </div>
    );
  }
}

export default ProjectExamples;
