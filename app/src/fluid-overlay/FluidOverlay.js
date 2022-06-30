import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import * as THREE from "three";
import './fluid-overlay.css';
import arrow_down from './img/arrow_down.svg';

class FluidOverlay extends Component {
  constructor(props) {
    super(props);
  }

  handleExploreClick() {
    document.getElementsByClassName("about-container")[0].scrollIntoView( { behavior: "smooth" } );
  }

  render() {
    return (
      <div>
        <div className="fluid-overlay">LET'S MAKE<br/>COOL<br/>THINGS<br/>TOGETHER</div>
        <div className="explore-container" onClick={this.handleExploreClick.bind(this)}>
          <div><span className="explore">Explore</span></div>
          <img src={arrow_down}></img>
        </div>
      </div>
    )
  }

}

export default FluidOverlay;
