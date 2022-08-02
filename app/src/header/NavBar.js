import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './navbar.css';
import Menu from './Menu';

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dropdown: null
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  handleScroll() {
    this.setState({
      dropdown: null
    });
  }

  setDropdown(dropdown) {
    this.setState({
      dropdown: (dropdown === this.state.dropdown) ? null : dropdown
    });
  }
  
  render() {
    return (
      <div className='navbar-container'>
          {/* Empty div for spacing */}
          <div className='nav-item'></div>
          <Menu 
            text='WORK'
            modals={this.props.modalRegistry.modals.filter(modal => modal.type === "work")}
            setModal={this.props.setModal}
            dropdown={this.state.dropdown === "work"}
            setDropdown={() => this.setDropdown("work")}
          />
          <Menu 
            text='MUSIC'
            modals={this.props.modalRegistry.modals.filter(modal => modal.type === "music")}
            setModal={this.props.setModal}
            dropdown={this.state.dropdown === "music"}
            setDropdown={() => this.setDropdown("music")}
          />
          <Menu 
            text='EXPERIMENTS'
            modals={this.props.modalRegistry.modals.filter(modal => modal.type === "experiment")}
            setModal={this.props.setModal}
            dropdown={this.state.dropdown === "experiments"}
            setDropdown={() => this.setDropdown("experiments")}
          />
      </div>
    )
  }
}
  
export default NavBar;