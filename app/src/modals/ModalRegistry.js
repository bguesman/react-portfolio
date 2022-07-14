import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './modal.css';

import * as Logging from '../logging/Logging';

class ModalRegistry {

  constructor() {
    this.modals = [
      // WORK
      {
        name: 'Expanse',
        type: 'work',
        markdownPath: require('./markdown/expanse.md')
      },
      {
        name: 'DRIVE Sim',
        type: 'work',
        markdownPath: require('./markdown/drivesim.md')
      },
      // MUSIC
      {
        name: 'Everything Will Happen',
        type: 'music',
        markdownPath: require('./markdown/test.md')
      },
      {
        name: 'Dogface (Score)',
        type: 'music',
        markdownPath: require('./markdown/test.md')
      },
      // EXPERIMENTS
      {
        name: 'Music Find',
        type: 'experiment',
        markdownPath: require('./markdown/test.md')
      },
      {
        name: 'Constructibles',
        type: 'experiment',
        markdownPath: require('./markdown/test.md')
      },
    ]
  }

}

export default ModalRegistry;
