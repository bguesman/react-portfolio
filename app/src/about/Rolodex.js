import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import TextTransition, { presets } from "react-text-transition";
import './about.css';

import * as Logging from '../logging/Logging'

// This is maybe a dumb name for this... but I kind of
// like it. I'm not even sure it exactly makes sense.
// 
// This UI component cycles out a portion of its text.
class Rolodex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayIndex: 0
    }
  }

  componentDidMount() {
    // This swaps the text every interval seconds.
    this.interval = setInterval(() => 
      {
        const nextItem = ((this.state.displayIndex + 1) % this.props.items.length);
        this.setState({ displayIndex: nextItem });
      },
    this.props.interval * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="about-rolodex" style={{transform: this.props.translateStyle}}>
        {this.props.prefix}<br/>
        <TextTransition
          className="about-rolodex-highlight" 
          springConfig={presets.gentle} inline={true}>
          {this.props.items[this.state.displayIndex]}
        </TextTransition>
      </div>
    )
  }
}

export default Rolodex;
