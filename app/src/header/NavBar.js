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
          <Menu 
            text='WORK'
            modals={this.props.modalRegistry.modals.filter(modal => modal.metadata.type === "work")}
            setModal={this.props.setModal}
            closeModal={this.props.closeModal}
          />
          <Menu 
            text='MUSIC'
            modals={this.props.modalRegistry.modals.filter(modal => modal.metadata.type === "music")}
            setModal={this.props.setModal}
            closeModal={this.props.closeModal}
          />
          <Menu 
            text='EXPERIMENTS'
            modals={this.props.modalRegistry.modals.filter(modal => modal.metadata.type === "experiment")}
            setModal={this.props.setModal}
            closeModal={this.props.closeModal}
          />
      </div>
    )
  }
}
  
export default NavBar;