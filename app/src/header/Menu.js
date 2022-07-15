import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './menu.css';
import arrow from './img/arrow.svg';

class Menu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hover: false
    }
  }

  renderDropdown() {
    return (
      <div className="dropdown-container">
        <div className="dropdown" style={{transform: this.props.dropdown ? "translateY(0%)" : "translateY(-105%)"}}>
          {this.props.modals.map((modal, i) => { 
            return (
            <div 
              className='menu-item' 
              key={i} 
              onClick={() => { 
                this.props.setModal(modal.name); 
                this.setState({ dropdown: false }); 
              }}
            >
              <span className='underline-on-hover'>{modal.name}</span>
            </div>)
          })}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div
          className='menu-container' 
          onClick={this.props.setDropdown}
          onMouseEnter={() => this.setState({hover: true})}
          onMouseLeave={() => this.setState({hover: false})}
        >
            <div className='nav-item'>
              <span>
                {this.props.text}
                <div className='animated-underline' style={{transform: this.state.hover ? "scaleX(1)" : "scaleX(0)", transformOrigin: this.state.hover ? 'bottom left' : 'bottom right'}}/>
              </span>
            </div>
            <div className='arrow-container menu-child'>
              <img 
                className='arrow'
                src={arrow}
                style={{transform: this.state.dropdown ? "rotate(180deg)" : "rotate(0deg)"}}
              />
            </div>
        </div>
        {this.renderDropdown()}
      </div>
    )
  }
}
  
Menu.defaultProps = {
  items: []
}

export default Menu;