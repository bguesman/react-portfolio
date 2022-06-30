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
      displayIndex: 0,
      visible: false
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

    // This adds an event listener to slide in the rolodex from the left
    // when it scrolls into view.
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onScroll(event) {
    const aboutY = document.getElementsByClassName("about-container")[0].getBoundingClientRect().top;
    // Early out in case DOM call fails for some reason
    if (!aboutY)
      return;

    this.setState({
      visible: (window.scrollY > (aboutY + 50))
    });
  }

  render() {
    return (
      <div 
        className="about-rolodex"
        style={{transform: "translate(" + (this.state.visible ? "0%" : "-120%") + ")"}}
      >
        {this.props.prefix}
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
