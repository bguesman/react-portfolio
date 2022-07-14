import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './navbar.css';
import './menu.css';

class Contact extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    }
  }

  handleClick() {
    document.getElementsByClassName("contact-container")[0].scrollIntoView( { behavior: "smooth" } );
  }

  render() {
    return (
      <div className='navbar-container'>
          <div
            className='menu-container' 
            onClick={this.handleClick}
            onMouseEnter={() => this.setState({hover: true})}
            onMouseLeave={() => this.setState({hover: false})}
          >
            <div className='nav-item'>
              <span>
                CONTACT
                <div className='animated-underline' style={{transform: this.state.hover ? "scaleX(1)" : "scaleX(0)", transformOrigin: this.state.hover ? 'bottom left' : 'bottom right'}}/>
              </span>
            </div>
          </div>
          {/* Empty divs for spacing */}
          <div className='nav-item'></div>
          <div className='nav-item'></div>
      </div>
    )
  }
}

export default Contact;