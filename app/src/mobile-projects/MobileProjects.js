import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './mobile-projects.css';

import * as Logging from '../logging/Logging';

class MobileProjects extends Component {
  render() {
    return (
      <div className="mobile-projects-container">
        {this.props.modalRegistry.modals.map((modal, i) => {
          if (!modal.displayOnMobile)
            return "";
          return <div className='mobile-project-item' key={i}
            onClick={() => {this.props.setModal(modal.name)}}>
            {/* {modal.name} */}
            <img src={modal.image}/>
          </div>;
        })}
      </div>
    );
  }
}

export default MobileProjects;
