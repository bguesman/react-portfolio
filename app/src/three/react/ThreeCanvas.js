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
    if (this.fluidHandle !== undefined) {
      this.fluidHandle.config.simulate = this.props.simulate;
    }

    return (
      // This tells us to call componentDidMount on this div? I don't fully understand it.
      <div 
        className="canvas" 
        id='three-canvas' 
        ref={(mount) => { this.mount = mount }}
      >
      </div>
    )
  }

}

export default ThreeCanvas;
