import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './project-examples.css';

import ProjectExLabel from "./ProjectExLabel";

import * as Logging from '../logging/Logging';

class ProjectEx extends Component {

  renderLabel() {
    const lightColorScheme = this.props.colorScheme === "light";
    const color = lightColorScheme ? "#111111" : "#ffffff";
    const orientationLeft = this.props.orientation === "left";
    return (
      <div className="align-to-bottom-container">
        <div className="align-to-bottom">
          <ProjectExLabel
            color={color}
            planetBlack={lightColorScheme}
            title={this.props.title}
            subtitle={this.props.subtitle}
            description={this.props.description}
            alignLeft={orientationLeft}
          />
        </div>
      </div>
    );
  }

  render() {
    const lightColorScheme = this.props.colorScheme === "light";
    const backgroundColor = lightColorScheme ? "#ffffff" : "#111111";
    const orientationLeft = this.props.orientation === "left";

    if (orientationLeft) {
      return (
        <div className="project-example-container" style={{backgroundColor: backgroundColor}}>
          {this.renderLabel()}
          {/* <div className="project-image-container">
            <img src="https://i.pinimg.com/originals/d7/e9/d7/d7e9d70cee41119a5d45121a8a999df9.png"/>
          </div> */}
        </div>
      );
    } else {
      return (
        <div className="project-example-container" style={{backgroundColor: backgroundColor}}>
          {/* <div className="project-image-container">
            <img src="https://i.pinimg.com/originals/d7/e9/d7/d7e9d70cee41119a5d45121a8a999df9.png"/>
          </div> */}
          {this.renderLabel()}
        </div>
      );
    }
  }
}

export default ProjectEx;
