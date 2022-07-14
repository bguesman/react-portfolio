import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './modal.css';

import * as Logging from '../logging/Logging';

import close_button from "./img/X.svg";

function ModalClose(props) {
  return (
    <div><span onClick={() => props.closeModal()}><img className='modal-close' src={close_button}></img></span></div>
  );
}

export default ModalClose;
