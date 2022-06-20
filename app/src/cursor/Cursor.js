import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './cursor.css';

class Cursor extends Component {

  constructor(props) {
    super(props);
    // Store the x and y position of the cursor in the state.
    this.state = {
      x: 0,
      y: 0,
      visible: true
    };
  }

  componentDidMount() {
    // Update state's position when mouse moves
    document.addEventListener('mousemove', (e) => {
        this.setState({x: e.pageX, y: e.pageY});
    });
    // Turn on/off the cursor when the mouse is outside the window
    document.addEventListener('mouseleave', (e) => {
      this.setState({visible: false});
    });
    document.addEventListener('mouseenter', (e) => {
      this.setState({visible: true});
    });
  }

  render() {
    if (this.state.visible)
    {
      return (
        <div className='cursor' style={{left: this.state.x, top: this.state.y}}/>
      )
    }
  }

}

export default Cursor;
