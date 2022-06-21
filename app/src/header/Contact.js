import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './navbar.css';

class Contact extends Component {
  render() {
    return (
      <div className='navbar-container'>
          <div className='nav-item'>CONTACT</div>
          {/* Empty divs for spacing */}
          <div className='nav-item'></div>
          <div className='nav-item'></div>
      </div>
    )
  }
}
  
export default Contact;