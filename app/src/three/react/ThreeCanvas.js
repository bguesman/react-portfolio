import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import * as THREE from "three";

import ThreeFluid from "../fluid/Fluid";

class ThreeCanvas extends Component {

  componentDidMount() {
    // This constructor does all the necessary initialization work
    // for the fluid.
    this.fluidHandle = new ThreeFluid();
    // this.setState({fluidHandle: new ThreeFluid()});
    // animate();
    // this.fluidHandle.animate();
  }

  render() {
    return (
      // This tells us to call componentDidMount on this div? I don't fully understand it.
      <div ref={ref => (this.mount = ref)} />
    )
  }

}

export default ThreeCanvas;
