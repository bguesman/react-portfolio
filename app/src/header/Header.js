import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './header.css';

import Title from './Title'
import NavBar from './NavBar'
import Contact from './Contact'

import * as Logging from '../logging/Logging'

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      previousScrollPos: 0
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  visible(currScroll, prevScroll) {
    // If we scrolled up, visible.
    const kScrollUpThreshold = 0;
    const diff = prevScroll - currScroll;
    const scrolledUp = diff > kScrollUpThreshold;
    // If we're at the top, visible.
    const kTopThreshold = 10;
    const atTop = currScroll < kTopThreshold;
    return scrolledUp || atTop;
  }

  handleScroll() {
    const currentScrollPos = window.pageYOffset;
    this.setState({
      visible: this.visible(currentScrollPos, this.state.previousScrollPos), 
      previousScrollPos: currentScrollPos
    });
  }

  render() {
    return (
      <div>
        <div 
          ref={(mount) => { this.mount = mount }}
          className='header-container'
          style={{top: this.state.visible ? 0 : -this.mount.clientHeight}}
        >
          <Contact/>
          <Title/>
          {/* <Contact/> */}
          <NavBar/>
        </div>
      </div>
    )
  }
}

export default Header;
