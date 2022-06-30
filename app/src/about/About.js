import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './about.css';

import * as Logging from '../logging/Logging';

import Rolodex from "./Rolodex";

class About extends Component {
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
          interval={2}
        />
        <div className="about-image-container">
          <img className="about-image" src="https://i.pinimg.com/originals/d7/e9/d7/d7e9d70cee41119a5d45121a8a999df9.png"/>
        </div>
      </div>
    );
  }
}

export default About;
