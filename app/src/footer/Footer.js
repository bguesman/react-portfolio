import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './footer.css';

import * as Logging from '../logging/Logging';

import github from "./img/github.png";
import spotify from "./img/spotify.png";
import youtube from "./img/youtube.png";
import linkedin from "./img/linkedin.png";

class Footer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }

    this.ref = React.createRef(null);

    this.spotifyLink = "https://open.spotify.com/artist/073z2iituqcfggtHLgTB7Q";
    this.youtubeLink = "https://www.youtube.com/channel/UCHBzoaGEDkI2P2jsUljq24Q/featured";
    this.linkedinLink = "https://www.linkedin.com/in/brad-guesman-871019110/";
    this.resumeLink = "resume.pdf";
    this.githubLink = "https://github.com/bguesman";
  }

  componentDidMount() {
    // This adds an event listener so we know when we have scrolled to this page.
    window.addEventListener('scroll', this.onScroll.bind(this));
  }
  
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(event) {
    // Early out in case ref hasn't been initialized yet
    if (!this.ref || !this.ref.current)
      return;

    const thisY = this.ref.current.getBoundingClientRect().top;
    this.setState({
      visible: thisY < window.innerHeight
    });
  }

  render() {
    return (
      <div className="footer-container">
        <div className="footer-item">
          <span className="underline-on-hover" onClick={() => window.open(this.spotifyLink, '_blank')}> 
            <img src={spotify} style={{width: "40px"}}></img>
          </span>
        </div>
        <div className="footer-item">
          <span className="underline-on-hover" onClick={() => window.open(this.youtubeLink, '_blank')}> 
            <img src={youtube} style={{width: "36px"}}></img>
          </span>
        </div>
        <div className="footer-item">
          <span className="underline-on-hover" onClick={() => window.open(this.githubLink, '_blank')}> 
            <img src={github} style={{width: "41px"}}></img>
          </span>
        </div>
        <div className="footer-item">
          <span className="underline-on-hover" onClick={() => window.open(this.linkedinLink, '_blank')}> 
            <img src={linkedin} style={{width: "36px"}}></img>
          </span>
        </div>
        <div className="footer-item">
          <span className="underline-on-hover" onClick={() => window.open(this.resumeLink, '_blank')}>RESUME</span>
        </div>
      </div>
    );
  }
}

export default Footer;
