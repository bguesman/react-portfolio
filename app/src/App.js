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
import Modal from "./modals/Modal";

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
      displayModal: false,
      modalLoaded: false,
      cursorDisplay: "normal" // one of [normal, click-for-more, click-to-copy]
    }
  }

  setCursorDisplay(display) {
    this.setState({
      cursorDisplay: display
    });
  }

  setModal(name) {
    // Select modal, indicate that we should render it in the DOM.
    const index = this.state.modalRegistry.modals.findIndex((modal) => modal.name === name);
    this.setState({
      selectedModal: index !== null ? index : 0,
      renderModal: index !== null ? true : false,
    });

    // After a short amount of time, indicate that we should change the opacity to 1.
    setTimeout(() => {
      this.setState({
        displayModal: true
      });
    }, 10);

    // After the transition is complete, indicate that the modal has loaded.
    setTimeout(() => {
      this.setState({
        modalLoaded: true
      });
    }, 550);
  }

  closeModal() {
    // Transition modal to zero opacity.
    this.setState({
      modalLoaded: false,
      displayModal: false
    });

    // Stop rendering the modal when it is at zero opacity.
    setTimeout(() => {
      this.setState({
        renderModal: false
      });
    }, 500);
  }

  renderModal() {
    if (this.state.renderModal) {
      return (
        <Modal
          visible={this.state.displayModal}
          closeModal={this.closeModal.bind(this)}
          markdownPath={this.state.modalRegistry.modals[this.state.selectedModal].markdownPath}
        />
      );
    }
  }

  renderMainPage() {
    return (
      <div style={{overflow: "visible"}}>
        <Header
          modalRegistry={this.state.modalRegistry}
          setModal={this.setModal.bind(this)}
        />
        <FluidOverlay/>
        {(this.state.modalLoaded ? "" : <ThreeCanvas simulate={!this.state.renderModal}/>)}
        <About/>
        <ProjectExamples
          modalRegistry={this.state.modalRegistry}
          setModal={this.setModal.bind(this)}
          setCursorDisplay={this.setCursorDisplay.bind(this)}
        />
        <Contact setCursorDisplay={this.setCursorDisplay.bind(this)}/>
        <Footer/>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <Cursor display={this.state.cursorDisplay}/>
        <LoadingScreen/>
        {this.renderModal()}
        {this.renderMainPage()}
      </div>
    )
  }
}

export default App;
