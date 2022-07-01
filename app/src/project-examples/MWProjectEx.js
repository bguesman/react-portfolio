import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './project-examples.css';

import ProjectExLabel from "./ProjectExLabel";

import * as Logging from '../logging/Logging';

class MWProjectEx extends Component {
  render() {
    return (
      <div className="project-example-container" style={{backgroundColor: "#111111"}}>
        <ProjectExLabel 
          color={"#ffffff"}
          planetBlack={false}
          title={"Modern Warfare"}
          subtitle={"AUDIO INTERACTION DESIGNER"}
          description={"Building user-centered, immersive sound propagation systems."}
        />
        <div className="project-image-container">
          <img src="https://i.pinimg.com/originals/d7/e9/d7/d7e9d70cee41119a5d45121a8a999df9.png"/>
        </div>
      </div>
    );
  }
}

export default MWProjectEx;
