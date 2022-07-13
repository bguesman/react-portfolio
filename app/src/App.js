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
import ModalRegistry from "./modals/ModalRegistry";

// Three-js for fluid simulation.
import * as THREE from "three";

class App extends Component {

  constructor(props) {
    super(props);

    // Modal state is global to the entire app, so that it
    // can be altered by various child components. The menu,
    // the project examples page, etc.
    this.state = {
      modalRegistry: new ModalRegistry(),
      selectedModal: 0,
      renderModal: false,
      displayModal: false
    }
  }

  setModal(name) {
    const index = this.state.modalRegistry.modals.findIndex((modal) => modal.metadata.name === name);
    this.setState({
      selectedModal: index !== null ? index : 0,
      renderModal: index !== null ? true : false,
      displayModal: true
    });

    // this.setTimeout(() => {
    //   this.setState({
    //     displayModal: true
    //   });
    // }, 100);
  }

  closeModal() {
    this.setState({
      displayModal: false,
      renderModal: false
    });

    // this.setTimeout(() => {
    //   this.setState({
    //     renderModal: false
    //   });
    // }, 1000);
  }

  renderModal() {
    if (this.state.renderModal) {
      return (
        this.state.modalRegistry.modals[this.state.selectedModal].component({
          visible: this.state.displayModal,
          closeModal: this.closeModal.bind(this)
        })
      );
    } else {
      // No-op
      return;
    }
  }

  render() {
    return (
      <div className="App">
        <Cursor/>
        <LoadingScreen/>
        <Header 
          modalRegistry={this.state.modalRegistry}
          setModal={this.setModal.bind(this)}
          closeModal={this.closeModal.bind(this)}
        />
        {this.renderModal()}
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
