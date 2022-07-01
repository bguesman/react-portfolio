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
    return (
      <div className="project-label-container" style={{color: this.props.color}}>
        <div className="project-title-container">
          <img className='project-example-planet' src={rightColorPlanet}/>
          <div className="project-example-title">{this.props.title}</div>
        </div>
        <div className="project-example-subtitle">{this.props.subtitle}</div>
        <div className="project-example-text">{this.props.description}</div>
      </div>
    );
  }
}

export default ProjectExLabel;
