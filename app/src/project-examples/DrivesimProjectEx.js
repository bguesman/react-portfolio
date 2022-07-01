import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './project-examples.css';

import ProjectExLabel from "./ProjectExLabel";

import * as Logging from '../logging/Logging';

class DrivesimProjectEx extends Component {
  render() {
    return (
      <div className="project-example-container" style={{backgroundColor: "#ffffff"}}>
        <div className="project-image-container">
            <img src="https://i.pinimg.com/originals/d7/e9/d7/d7e9d70cee41119a5d45121a8a999df9.png"/>
        </div>
        <ProjectExLabel
          color={"#111111"}
          planetBlack={true}
          title={"Drivesim"}
          subtitle={"DEVELOPER"}
          description={"A virtual playground for autonomous agents, built in NVIDIA Omniverse."}
        />
      </div>
    );
  }
}

export default DrivesimProjectEx;
