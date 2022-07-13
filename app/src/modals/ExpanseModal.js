import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './modal.css';

import * as Logging from '../logging/Logging';

function ExpanseModal(props) {
  return (
    <div className="modal-container" style={{opacity: props.visible ? "1" : "0"}}>
      <div>EXPANSE</div>
      <div onClick={() => props.closeModal()}>CLOSE MODAL</div>
    </div>
  );
}

export default ExpanseModal;
