import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './project-examples.css';

import * as Logging from '../logging/Logging';

class ProjectExamplesHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    // This adds an event listener to slide in the headers when we scroll
    // to the project examples section.
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(event) {
    if (document.getElementsByClassName("project-examples-container").length == 0)
      return;

    const projectExamplesY = document.getElementsByClassName("project-examples-container")[0].getBoundingClientRect().top;
    // Early out in case DOM call fails for some reason
    if (!projectExamplesY)
      return;

    this.setState({
      visible: (window.scrollY > (projectExamplesY + 50))
    });
  }

  render() {
    return (
      <div className="project-example-header-container">
        <div 
          className="project-example-header-item"
          style={{transform: "translate(" + (this.state.visible ? "0%" : "-150%") + ")"}}>
          {"// SOME OF THOSE THINGS"}
        </div>
        <div 
          className="project-example-header-item"
          style={{transform: "translate(" + (this.state.visible ? "0%" : "150%") + ")"}}>
          {"PORTFOLIO"}
        </div>
      </div>
    );
  }
}

export default ProjectExamplesHeader;
