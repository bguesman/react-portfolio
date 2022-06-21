import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './navbar.css';
import Menu from './Menu';

class NavBar extends Component {
  render() {
    return (
      <div className='navbar-container'>
          {/* Empty div for spacing */}
          <div className='nav-item'></div>
          <Menu text='WORK'></Menu>
          <Menu text='MUSIC'></Menu>
          <Menu text='EXPERIMENTS'></Menu>
      </div>
    )
  }
}
  
export default NavBar;