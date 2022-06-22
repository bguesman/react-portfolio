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
      <div 
        className="canvas" 
        id='three-canvas' 
        ref={(mount) => { this.mount = mount }}
      />
    )
  }

}

export default ThreeCanvas;
