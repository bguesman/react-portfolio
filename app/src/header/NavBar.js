import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './navbar.css';

class NavBar extends Component {
  render() {
    return (
      <div className='navbar-container'>
          {/* Empty div for spacing */}
          <div className='nav-item'></div>
          <div className='nav-item'>WORK</div>
          <div className='nav-item'>MUSIC</div>
          <div className='nav-item'>EXPERIMENTS</div>
      </div>
    )
  }
}
  
export default NavBar;