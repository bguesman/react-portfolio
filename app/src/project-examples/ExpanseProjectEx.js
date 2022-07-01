import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './project-examples.css';
import planet_white from '../header/img/planet_white.svg';

import ProjectExLabel from "./ProjectExLabel";

import * as Logging from '../logging/Logging';

class ExpanseProjectEx extends Component {
  render() {
    return (
      <div className="project-example-container">
        <ProjectExLabel 
          color={"#ffffff"}
          planetBlack={false}
          title={"Expanse"}
          subtitle={"CREATOR"}
          description={"Reimagining what a procedural sky system can do, and how it does it."}
        />
        <div className="project-image-container">
          <img src="https://i.pinimg.com/originals/d7/e9/d7/d7e9d70cee41119a5d45121a8a999df9.png"/>
        </div>
      </div>
    );
  }
}

export default ExpanseProjectEx;
