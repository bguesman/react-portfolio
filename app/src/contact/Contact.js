import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './contact.css';

import * as Logging from '../logging/Logging';

class Contact extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      boldPhrases: [],
      composed: <div></div>,
      centerTextVisible: false,
      backgroundTextVisible: false
    }

    this.ref = React.createRef(null);

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
      "AI-assisted content authoring",
      "the Moog little phatty monophonic synthesizer",
      "how many licks it actually takes to get to the center of a tootsie pop",
      "Gödel's proof",
      "logos with messed up kerning",
      "style transfer for fluid simulation",
      "your favorite home-cooked meal",
      "feeling small in the face of a gigantic universe",
      "working to understand people who are different than you",
      "over-using tritone substitutions",
      "standing desks",
      "why there are no Halal trucks in the Bay Area (seriously, why?)",
      "the widespread assumption of causal reductionism",
      "clamming and quahogging",
      "ray tracing black holes",
      "star gazing far away from a city",
      "The Boss CE-2 chorus",
      "misjudging the relevant domain of the scientific method",
      "materialism",
      "Lou Reed's lyrics"
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

    // This adds an event listener so we know when we have scrolled to this page.
    window.addEventListener('scroll', this.onScroll.bind(this));
  }
  
  componentWillUnmount() {
    clearInterval(this.interval);
    window.removeEventListener('scroll', this.onScroll.bind(this));
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

  onScroll(event) {
    // Early out in case ref hasn't been initialized yet
    if (!this.ref || !this.ref.current)
      return;

    const thisY = this.ref.current.getBoundingClientRect().top;
    this.setState({
      backgroundTextVisible: thisY < (window.innerHeight * 0.9),
      centerTextVisible: thisY < (window.innerHeight * 0.5)
    });
  }

  render() {
    const translate = this.state.centerTextVisible ? "translateY(0%)" : "translateY(100%)";
    const opacity = this.state.backgroundTextVisible ? 1 : 0;
    return (
      <div className="contact-container" ref={this.ref}>
        <div className="center-text-container">
          <div className="center-text">
            <div className="center-text-float-up" style={{transform: translate}}>brad.guesman<wbr/>@gmail.com</div>
          </div>
        </div>
        <div className="wrapped-text" style={{opacity: opacity}}>{this.state.composed}</div>
      </div>
    );
  }
}

export default Contact;
