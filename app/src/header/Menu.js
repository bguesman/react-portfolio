import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './menu.css';
// import planet from './img/planet.svg';
import arrow from './img/arrow.svg';

class Menu extends Component {
  render() {
    return (
      <div className='menu-container'>
          <div className='nav-item'>{this.props.text}</div>
          <img className='arrow menu-child' src={arrow}></img>
      </div>
    )
  }
}
  
export default Menu;