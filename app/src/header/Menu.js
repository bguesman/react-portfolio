import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './menu.css';
// import planet from './img/planet.svg';
import arrow from './img/arrow.svg';

class Menu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dropdown: false
    }
  }

  setDropdownState() {
    this.setState({
      dropdown: !this.state.dropdown
    })
  }

  renderDropdown() {
    return (
      <div className="dropdown-container">
        {this.props.modals.map((modal, i) => { 
          return (<div className="menu-item" key={i}>
            <span className='underline-on-hover' onClick={() => this.props.setModal(modal.metadata.name)}>{modal.metadata.name}</span>
          </div>)
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div className='menu-container'>
            <div className='nav-item'>
              <span className='underline-on-hover' onClick={this.setDropdownState.bind(this)}>{this.props.text}</span>
            </div>
            <img className='arrow menu-child' src={arrow}></img>
        </div>
        {(this.state.dropdown) ? this.renderDropdown() : null}
      </div>
    )
  }
}
  
Menu.defaultProps = {
  items: []
}

export default Menu;