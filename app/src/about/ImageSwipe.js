import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './about.css';

import * as Logging from '../logging/Logging';

function saturate(x)
{
  return Math.min(Math.max(0, x), 1);
}

class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      opacity: 0,  // Range 0-1
      mouseDown: false,
      prevMouseX: null,
      prevMouseY: null
    }
  }

  handleMouseDown(event)
  {
    this.setState({
      mouseDown: true,
      prevMouseX: event.clientX,
      prevMouseY: event.clientY
    });
  }

  handleMouseMove(event) {
    if (this.state.mouseDown)
    {
      var diff = this.state.prevMouseY - event.clientY;
      this.setState({
        opacity: saturate(this.state.opacity + diff * 0.005),
        prevMouseX: event.clientX,
        prevMouseY: event.clientY
      })
    }
  }

  handleMouseUp(event)
  {
    this.setState({
      mouseDown: false,
    });
  }


  render() {
    return (
      <div 
        className="about-image-container"
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
        onDragStart={(event)=> event.preventDefault()}
      >
        <div className="about-image">
          <img 
            className="about-image-below" 
            src={this.props.image1}
          />
          <img 
            draggable="true"
            className="about-image-overlay" 
            src={this.props.image2}
            style={{opacity: this.state.opacity}}
            onMouseDown={this.handleMouseDown.bind(this)}
            onMouseMove={this.handleMouseMove.bind(this)}
            onMouseUp={this.handleMouseUp.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default About;
