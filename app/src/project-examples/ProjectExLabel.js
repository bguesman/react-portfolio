import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './project-ex-label.css';
import planet_white from '../header/img/planet_white.svg';
import planet from '../header/img/planet.svg';

import * as Logging from '../logging/Logging';

class ProjectExLabel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var rightColorPlanet = this.props.planetBlack ? planet : planet_white;
    const justifyContent = this.props.alignLeft ? "flex-start" : "flex-end";
    const textAlign = this.props.alignLeft ? "left" : "right";
    const translate = "translate(" 
      + (
        this.props.visible 
        ? "0%)" 
        : (this.props.alignLeft
          ? "-100%)"
          : "100%)"
        )
      );

    return (
      <div className="project-label-container" style={{color: this.props.color, textAlign: textAlign}}>
        <div className="project-title-container" style={{justifyContent: justifyContent, transform:translate}}>
          <img className='project-example-planet' src={rightColorPlanet}/>
          <div className="project-example-title">{this.props.title}</div>
        </div>
        <div className="project-example-subtitle" style={{transform:translate}}>{this.props.subtitle}</div>
        <div className="project-example-text" style={{transform:translate}}>{this.props.description}</div>
      </div>
    );
  }
}

export default ProjectExLabel;
