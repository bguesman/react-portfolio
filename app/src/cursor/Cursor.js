import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import TextTransition, { presets } from "react-text-transition";
import './cursor.css';

class Cursor extends Component {

  constructor(props) {
    super(props);
    // Store the x and y position of the cursor in the state.
    this.state = {
      x: 0,
      y: 0,
      visible: true,
      copied: false,
      prevScroll: window.scrollY
    };
  }

  componentDidMount() {
    // Update state's position when mouse moves
    document.addEventListener('mousemove', (e) => {
        this.setState({x: e.pageX, y: e.pageY + (window.scrollY - this.state.prevScroll)});
    });
    document.addEventListener('scroll', (e) => {
      this.setState({y: this.state.y + (window.scrollY - this.state.prevScroll), prevScroll: window.scrollY})
    });
    // Turn on/off the cursor when the mouse is outside the window
    document.addEventListener('mouseleave', (e) => {
      this.setState({visible: false});
    });
    document.addEventListener('mouseenter', (e) => {
      this.setState({visible: true});
    });
    document.addEventListener('mousedown', (e) => {
      if (this.props.display === 'click-to-copy') {
        this.setState({
          copied: true
        });
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const newState = prevProps.display === "click-to-copy" ? prevState.copied : false;
    if (prevState && prevState.copied != newState) {
      this.setState({
        copied: newState
      })
    }
  }

  render() {
    if (this.state.visible) {
      const containsText = this.props.display === "click-to-copy" || this.props.display === "click-for-more";
      if (containsText) {
        const displayText = this.props.display === "click-to-copy" ? (this.state.copied ? "address copied!" : "click to copy") : "click for more";
        return (
          <div 
            className='cursor' 
            style={{
              left: this.state.x, 
              top: this.state.y,
              transform: "scale(4)",
              mixBlendMode: "normal",
              background: "#eee"
            }}
          >
            <div>
                {/* the only way to center the text without fucking up the transition
                  wrapper is to have a div padding space above it */}
                <div style={{paddingTop: "7px", paddingRight: "1px"}}></div>
                <TextTransition
                  className="cursor-text" 
                  springConfig={{mass: 0.75, tension: 120, friction: 15}}
                  direction='up'>
                  {displayText}
                </TextTransition>
            </div>
          </div>
        )
      }
      else {
        return (
          <div 
            className='cursor' 
            style={{
              left: this.state.x, 
              top: this.state.y,
              transform: "scale(1)",
              mixBlendMode: "difference",
              background: "#fff"
            }}
          />
        )
      }
    }
  }

}

export default Cursor;
