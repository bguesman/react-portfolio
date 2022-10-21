import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './about.css';

import * as Logging from '../logging/Logging';

class About extends Component {

  constructor(props) {
    super(props);
    // this.state = {
    //   visible: false
    // }
  }

  componentDidMount() {
    // This adds an event listener to slide in the rolodex from the left
    // when it scrolls into view.
    // window.addEventListener('scroll', this.onScroll.bind(this));
  }

  componentWillUnmount() {
    // window.removeEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll(event) {
    // if (document.getElementsByClassName("about-container").length == 0)
    //   return;
      
    // const aboutY = document.getElementsByClassName("about-container")[0].getBoundingClientRect().top;
    // // Early out in case DOM call fails for some reason
    // if (!aboutY)
    //   return;

    // this.setState({
    //   visible: (window.scrollY > (aboutY + 50))
    // });
  }

  render() {
    return (
      <div 
        className="about-image-container"
        onMouseEnter={this.props.onMouseEnter}
        onMouseLeave={this.props.onMouseLeave}
      >
          <img className="about-image" src={this.props.image2}/>
      </div>
    );
  }
}

export default About;
