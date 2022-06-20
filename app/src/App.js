import React, { Component } from "react";
import ReactDOM from 'react-dom/client';

import logo from './logo.svg';
import './App.css';

// Three.js canvas
import ThreeCanvas from "./three/react/ThreeCanvas";

// Custom cursor
import Cursor from "./cursor/Cursor";

// Three-js for fluid simulation.
import * as THREE from "three";

class App extends Component {

  render() {
    // Three js integration
    return (
      // This tells us to call componentDidMount on this div? I don't fully understand it.
      <div className="App">
        <Cursor></Cursor>
        <div>test</div>
        <ThreeCanvas/>
      </div>
    )

    // Default React
    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <p>
    //         Edit <code>src/App.js</code> and save to reload.
    //       </p>
    //       <a
    //         className="App-link"
    //         href="https://reactjs.org"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         Learn React
    //       </a>
    //     </header>
    //   </div>
    // );
  }
}

export default App;
