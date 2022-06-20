import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './navbar.css';

class NavBar extends Component {
  render() {
    return (
      <div>
      <div className='title'>Brad Guesman</div>
      <div className='subtitle'>Creative<br/>Technologist</div>
      </div>
    )
  }
}

export default NavBar;
