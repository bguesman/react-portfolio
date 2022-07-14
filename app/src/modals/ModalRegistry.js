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
        markdownPath: require('./markdown/work/expanse.md')
      },
      {
        name: 'DRIVE Sim',
        type: 'work',
        markdownPath: require('./markdown/work/drivesim.md')
      },
      {
        name: 'Modern Warfare',
        type: 'work',
        markdownPath: require('./markdown/work/mw.md')
      },
      // MUSIC
      {
        name: 'Everything Will Happen',
        type: 'music',
        markdownPath: require('./markdown/music/everything-will-happen.md')
      },
      {
        name: 'Dogface (Score)',
        type: 'music',
        markdownPath: require('./markdown/music/dogface.md')
      },
      // EXPERIMENTS
      {
        name: 'Music Find',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/musicfind.md')
      },
      {
        name: 'Constructibles',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/constructibles.md')
      },
    ]
  }

}

export default ModalRegistry;
