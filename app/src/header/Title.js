import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './title.css';
import planet from './img/planet.svg';


// "Brad Guesman" + Logo
class Title extends Component {
  render() {
    return (
      <div className='title-container'>
        <img className='planet title-child' src={planet}/>
        <div className='title title-child'>Brad Guesman</div>
      </div>
    )
  }
}

export default Title;