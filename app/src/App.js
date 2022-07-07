import React, { Component, createRef } from "react";
import ReactDOM from 'react-dom/client';

import logo from './logo.svg';
import './App.css';

// Three.js canvas
import ThreeCanvas from "./three/react/ThreeCanvas";

// Custom cursor
import Cursor from "./cursor/Cursor";

// Actual site content
import LoadingScreen from "./loading-screen/LoadingScreen";
import Header from "./header/Header";
import FluidOverlay from "./fluid-overlay/FluidOverlay";
import About from "./about/About";
import ProjectExamples from "./project-examples/ProjectExamples";
import Contact from "./contact/Contact";
import Footer from "./footer/Footer";

// Three-js for fluid simulation.
import * as THREE from "three";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Cursor/>
        <LoadingScreen/>
        <Header/>
        <FluidOverlay/>
        <ThreeCanvas/>
        <About/>
        <ProjectExamples/>
        <Contact/>
        <Footer/>
      </div>
    )
  }
}

export default App;
