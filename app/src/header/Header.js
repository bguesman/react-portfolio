import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './header.css';

import Title from './Title'
import NavBar from './NavBar'
import Contact from './Contact'

class Header extends Component {
  render() {
    return (
      <div>
        <div className='header-container'>
          <Contact/>
          <Title/>
          {/* <Contact/> */}
          <NavBar/>
        </div>
        <div className='subtitle'>Creative<br/>Technologist</div>
      </div>
    )
  }
}

export default Header;
