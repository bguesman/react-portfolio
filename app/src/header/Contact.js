import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './navbar.css';

class Contact extends Component {

  handleClick() {
    document.getElementsByClassName("contact-container")[0].scrollIntoView( { behavior: "smooth" } );
  }

  render() {
    return (
      <div className='navbar-container'>
          <div className='nav-item'><span className='underline-on-hover' onClick={this.handleClick}>CONTACT</span></div>
          {/* Empty divs for spacing */}
          <div className='nav-item'></div>
          <div className='nav-item'></div>
      </div>
    )
  }
}

export default Contact;