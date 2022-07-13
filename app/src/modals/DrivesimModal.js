import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './modal.css';

import * as Logging from '../logging/Logging';

function DrivesimModal(props) {
  return (
    <div className="modal-container" style={{opacity: props.visible ? "1" : "0"}}>
      DRIVESIM
    </div>
  );
}

export default DrivesimModal;
