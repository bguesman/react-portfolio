import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './about.css';

import * as Logging from '../logging/Logging'

// This is maybe a dumb name for this... but I kind of
// like it. I'm not even sure it exactly makes sense.
// 
// This UI component cycles out a portion of its text.
class Rolodex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayIndex: 0
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ displayIndex: ((this.state.displayIndex + 1) % this.props.items.length) }), this.interval * 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="about-rolodex">{this.props.prefix}
        <span className="about-rolodex-highlight"> {this.props.items[this.state.displayIndex]}</span>
      </div>
    )
  }
}

export default Rolodex;
