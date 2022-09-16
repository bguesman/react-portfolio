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
        markdownPath: require('./markdown/work/website.md'),
        image: '/img/site/splash.png',
        displayOnMobile: true
      },
      {
        name: 'Expanse',
        type: 'work',
        markdownPath: require('./markdown/work/expanse.md'),
        image: '/img/expanse/twilight.jpg',
        displayOnMobile: true
      },
      {
        name: 'DRIVE Sim',
        type: 'work',
        markdownPath: require('./markdown/work/drivesim.md'),
        image: '/img/drivesim/drivesim.png',
        displayOnMobile: true
      },
      {
        name: 'Modern Warfare',
        type: 'work',
        markdownPath: require('./markdown/work/mw.md'),
        image: '/img/mw/farah.jpeg',
        displayOnMobile: true
      },
      {
        name: 'Shape From Tracing',
        type: 'work',
        markdownPath: require('./markdown/work/sft.md'),
        image: '/img/sft/dragon.png',
        displayOnMobile: true
      },
      {
        name: 'Digital Arboretum',
        type: 'work',
        markdownPath: require('./markdown/work/digital-arboretum.md'),
        image: '/img/digital-arboretum/golf-course.png',
        displayOnMobile: true
      },
      // MUSIC
      {
        name: 'SN0WCRASH',
        type: 'music',
        markdownPath: require('./markdown/music/snowcrash.md'),
        image: '/img/snowcrash/banner.jpg',
        displayOnMobile: true
      },
      {
        name: 'Prepared To Be Bored',
        type: 'music',
        markdownPath: require('./markdown/music/prepared-to-be-bored.md'),
        image: '/img/prepared-to-be-bored/splash.jpg',
        displayOnMobile: true
      },
      {
        name: 'Dogface (Score)',
        type: 'music',
        markdownPath: require('./markdown/music/dogface.md'),
        image: '/img/dogface/splash.png',
        displayOnMobile: true
      },
      {
        name: 'Expanse (Score)',
        type: 'music',
        markdownPath: require('./markdown/music/expanse.md'),
        image: '/img/expanse/sunset-clouds-nonphys.jpg',
        displayOnMobile: true
      },
      {
        name: 'Lantern Village (Score)',
        type: 'music',
        markdownPath: require('./markdown/music/lantern-village.md'),
        image: '/img/lantern-village/lantern-village.jpg',
        displayOnMobile: true
      },
      {
        name: 'Watercolor',
        type: 'music',
        markdownPath: require('./markdown/music/watercolor.md'),
        image: '/img/keybird/splash.jpg',
        displayOnMobile: false
      },
      {
        name: 'Production Work',
        type: 'music',
        markdownPath: require('./markdown/music/production.md'),
        image: '/img/keybird/splash.jpg',
        displayOnMobile: false
      },
      // EXPERIMENTS
      {
        name: 'Music Find',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/musicfind.md'),
        image: '/img/musicfind/music-find.jpg',
        displayOnMobile: true
      },
      {
        name: 'Path Tracer',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/path-tracer.md'),
        image: '/img/path-tracer/path-tracer.jpg',
        displayOnMobile: true
      },
      {
        name: 'Constructibles',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/constructibles.md'),
        image: '/img/expanse/expanse-clouds.jpg',
        displayOnMobile: false
      },
      {
        name: 'Lantern Village',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/lantern-village.md'),
        image: '/img/lantern-village/groupshot_2.jpg',
        displayOnMobile: true
      },
      {
        name: 'Black Hole Raytracing',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/black-hole-raytracing.md'),
        image: '/img/black-holes/black-holes.jpg',
        displayOnMobile: true
      },
      {
        name: 'The Replicant',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/replicant.md'),
        image: '/img/replicant/full.jpg',
        displayOnMobile: true
      },
      {
        name: 'Virtual Sky',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/virtual-sky.md'),
        image: '/img/virtual-sky/moody.jpg',
        displayOnMobile: true
      },
      {
        name: 'Wet Net',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/wetnet.md'),
        image: '/img/expanse/expanse-clouds.jpg',
        displayOnMobile: false
      },
      {
        name: 'Planetary Motion',
        type: 'experiment',
        markdownPath: require('./markdown/experiments/planetary-motion.md'),
        image: '/img/expanse/expanse-clouds.jpg',
        displayOnMobile: false
      },
    ]
  }

}

export default ModalRegistry;
