import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import * as THREE from "three";
import './three-canvas.css';

import ThreeFluid from "../fluid/Fluid";

class ThreeCanvas extends Component {

  componentDidMount() {
    this.fluidHandle = new ThreeFluid(this.mount);
  }

  componentWillUnmount() {
    this.fluidHandle.cleanup();
  }

  render() {
    return (
      // This tells us to call componentDidMount on this div? I don't fully understand it.
      <div>
      <div className="fucker">LET'S MAKE<br/>COOL<br/>THINGS<br/>TOGETHER</div>
      <div 
        className="canvas" 
        id='three-canvas' 
        ref={(mount) => { this.mount = mount }}
      >
      
      </div>
      </div>
    )
  }

}

export default ThreeCanvas;
