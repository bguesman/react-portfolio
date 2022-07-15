import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './modal.css';

import * as Logging from '../logging/Logging';

class ModalRegistry {

  constructor() {
    this.modals = [
      // WORK
      {
        name: 'This Website',
        type: 'work',
        markdownPath: require('./markdown/work/website.md')
      },
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
      {
        name: 'Shape From Tracing',
        type: 'work',
        markdownPath: require('./markdown/work/sft.md')
      },
      {
        name: 'Digital Arboretum',
        type: 'work',
        markdownPath: require('./markdown/work/digital-arboretum.md')
      },
      // MUSIC
      {
        name: 'SN0WCRASH',
        type: 'music',
        markdownPath: require('./markdown/music/snowcrash.md')
      },
      {
        name: 'Prepared To Be Bored',
        type: 'music',
        markdownPath: require('./markdown/music/prepared-to-be-bored.md')
      },
      {
        name: 'Dogface (Score)',
        type: 'music',
        markdownPath: require('./markdown/music/dogface.md')
      },
      {
        name: 'Expanse (Score)',
        type: 'music',
        markdownPath: require('./markdown/music/expanse.md')
      },
      {
        name: 'Lantern Village (Score)',
        type: 'music',
        markdownPath: require('./markdown/music/lantern-village.md')
      },
      {
        name: 'Watercolor',
        type: 'music',
        markdownPath: require('./markdown/music/watercolor.md')
      },
      {
        name: 'Production Work',
        type: 'music',
        markdownPath: require('./markdown/music/production.md')
      },
      // EXPERIMENTS
      {
        name: 'Lantern Village',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/lantern-village.md')
      },
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
      {
        name: 'Black Hole Raytracing',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/black-hole-raytracing.md')
      },
      {
        name: 'The Replicant',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/replicant.md')
      },
      {
        name: 'Virtual Sky',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/virtual-sky.md')
      },
      {
        name: 'Path Tracer',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/path-tracer.md')
      },
      {
        name: 'Wet Net',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/wetnet.md')
      },
      {
        name: 'Planetary Motion',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/planetary-motion.md')
      },
    ]
  }

}

export default ModalRegistry;
