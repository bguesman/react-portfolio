import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './modal.css';

import * as Logging from '../logging/Logging';

import ExpanseModal from './ExpanseModal';
import DrivesimModal from './DrivesimModal';

class ModalRegistry {

  constructor() {
    this.modals = [
      {
        metadata: {
          name: 'Expanse',
          type: 'work'
        },
        component: ExpanseModal
      },
      {
        metadata: {
          name: 'DRIVE Sim',
          type: 'work'
        },
        component: DrivesimModal
      },
    ]
  }

}

export default ModalRegistry;
