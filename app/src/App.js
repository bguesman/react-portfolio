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
      prevScroll: 0
    }
  }

  setModal(name) {
    const index = this.state.modalRegistry.modals.findIndex((modal) => modal.name === name);
    this.setState({
      selectedModal: index !== null ? index : 0,
      renderModal: index !== null ? true : false
    });

    setTimeout(() => {
      this.setState({
        displayModal: true
      });
    }, 0);

    setTimeout(() => {
      this.setState({
        modalLoaded: true,
        prevScroll: window.scrollY
      });
      window.scrollTo(0, 0);
    }, 500);
  }

  closeModal() {
    this.setState({
      displayModal: false,
      modalLoaded: false
    });
    window.scrollTo(0, this.state.prevScroll);

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
    } else {
      // No-op
      return;
    }
  }

  renderMainPage() {
    if (this.state.modalLoaded) {
      // No-op
      return;
    } else {
      return (
        <div>
          <Header 
            modalRegistry={this.state.modalRegistry}
            setModal={this.setModal.bind(this)}
            closeModal={this.closeModal.bind(this)}
          />
          <FluidOverlay/>
          <ThreeCanvas/>
          <About/>
          <ProjectExamples/>
          <Contact/>
          <Footer/>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="App">
        <Cursor/>
        <LoadingScreen/>
        {this.renderModal()}
        {this.renderMainPage()}
      </div>
    )
  }
}

export default App;
