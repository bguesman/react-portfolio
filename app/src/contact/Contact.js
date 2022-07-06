import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './contact.css';

import * as Logging from '../logging/Logging';

class Contact extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      boldPhrases: [],
      composed: <div></div>
    }

    this.introPhrase = "Send me a message, and maybe we’ll end up talking about ";
    this.separator = ", or ";
    this.boldPhrases = 4;
    this.phrases = [
      "skate-boarding on San Francisco roads",
      "understanding hemispheric differences in the brain",
      "marinating chicken in ouzo",
      "the multi-grid method for fluid simulation",
      "conspicuous environmentalism",
      "60’s Japanese guitar manufacturers",
      "your favorite cartoon growing up",
      "the Hario v60 pourover brewer",
      "simulating multiple scattering in cumulus clouds",
      "differential geometry",
      "writing lyrics that don’t suck",
      "how retrofuturism is getting old",
      "what book you just read",
      "the epistemics of studying the mind",
      "how to make consistently good stovetop rice (advice needed)",
      "Vangelis’ score of Blade Runner",
      "keeping in touch with friends who live far away",
      "producing a song that you don’t immediately relate to",
      "phaser pedals from the 1970’s",
      "mx key switches",
      "trying to write guitar parts that don’t sound like the strokes",
      "interactive storytelling in digital experiences",
      "Olga Ravn",
      "how terrible live-action cowboy bebop was",
      "your favorite plant-based meat",
      "solarpunk",
      "Trent Reznor's film scores",
      "biomimicry",
      "AI terrain generation",
      "John Bonham's kick drum roll",
      "making human-computer interfaces more... human?",
      "how to help artists and engineers understand each other",
      "repurposing Rao's sauce jars as cups (they're really big)",
      "Monte-Carlo path tracing",
      "AI-assisted content authoring"
    ]
  }

  componentDidMount() {
    this.compose();

    // Bold different items every 2 seconds.
    this.interval = setInterval(() => 
      {
        this.compose();
      },
    2000);
  }

  compose() {
    // Pick bold phrase indices. This doesn't really need to be react state,
    // but we'll store it there anyway.
    var boldPhrases = [];
    for (var i = 0; i < this.boldPhrases; i++) {
      boldPhrases[i] = Math.floor(Math.random() * this.phrases.length)
    }
    this.setState({
      boldPhrases: boldPhrases
    });

    var composed = (
      <div>
        <span>{this.introPhrase}</span>
        {this.phrases.map((object, i) => {
          var style = {
            textShadow: boldPhrases.includes(i)
              ? "-0.4px -0.4px 1px #333333, 0.4px -0.4px 1px #333333, -0.4px 0.4px 1px #333333, 0.4px 0.4px 1px #333333"
              : ""
          }
          return <span key={i}><span className="boldable-text" style={style}>{object}</span>{(i < this.phrases.length - 1) ? this.separator : ""}</span>;
        })}
      </div>
    );

    this.setState({
      composed: composed
    })
  }

  render() {
    return (
      <div className="contact-container">
        <div className="center-text-container">
          <div className="center-text">brad.guesman<wbr/>@gmail.com</div>
        </div>
        <div className="wrapped-text">{this.state.composed}</div>
      </div>
    );
  }
}

export default Contact;
