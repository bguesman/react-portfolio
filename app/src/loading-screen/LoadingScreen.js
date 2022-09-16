import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import './loading-screen.css';
// import planet from './img/planet.svg';
import LoadingIcon from "./LoadingIcon";

import * as Logging from '../logging/Logging';

class LoadingScreen extends Component {

  constructor(props) {
    super(props);
    
    this.secsDuration = 4;

    this.state = {
      loading: true,
      render: true
    }

    this.ref = React.createRef(null);
  }

  componentDidMount() {    
    this.setState({
      loading: true,
      render: true
    });

    this.loadingTimeout = setTimeout(() => 
      {
        this.setState({
          loading: false
        });
        // Enable scrolling
        document.body.style.overflow = "visible";
        // Make sure we start at the top of the page.
        window.scrollTo(0, 0);
      },
      this.secsDuration * 1000);

    this.renderTimeout = setTimeout(() => 
      {
        this.setState({
          render: false
        })
      },
      this.secsDuration * 1000 + 1000);
    
    // Hide scroll while loading screen is going.
    document.body.style.overflow = "hidden";
  }
  
  componentWillUnmount() {
    clearInterval(this.loadingTimeout);
    clearInterval(this.renderTimeout);
  }

  render() {
    if (!this.state.render)
      return;
    const opacity = this.state.loading ? 1 : 0;
    return (
      <div className="loading-screen-container" ref={this.ref} style={{opacity: opacity}}>
        <div className="loading-icon" style={{width: this.props.mobile ? "25vh" : "45vh"}}><LoadingIcon/></div>
      </div>
    );
  }
}

export default LoadingScreen;
