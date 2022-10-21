import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './about.css';
import faceImage from './img/focus-face.jpg';
import guitarImage from './img/focus-guitar.jpg';

import * as Logging from '../logging/Logging';

import Rolodex from "./Rolodex";
import ImageSwipe from "./ImageSwipe";

class About extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }

  componentDidMount() {
    // This adds an event listener to slide in the rolodex from the left
    // when it scrolls into view.
    window.addEventListener('scroll', this.onScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(event) {
    if (document.getElementsByClassName("about-container").length == 0)
      return;
      
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
      <div className="about-container">
        <Rolodex 
          prefix={"Hi, I'm Brad, and I like to make things that "} 
          items={[
            "feel right.", 
            "sound good.",
            "work well.",
            "inspire people.", 
            "look great.",
            "are fun to use.",
            "connect people.",
            "don't suck.",
            "give perspective."
          ]}
          translateStyle={"translate(" + (this.state.visible ? "0%" : "-120%") + ")"}
          interval={2}
        />
        <ImageSwipe 
          image1={faceImage}
          image2={guitarImage}
          onMouseEnter={() => this.props.setCursorDisplay('display-text', 'drag me around')}
          onMouseLeave={() => this.props.setCursorDisplay('normal')}
        />
      </div>
    );
  }
}

export default About;
