import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import { marked } from 'marked';

import './modal.css';

import * as Logging from '../logging/Logging';

import ModalClose from "./ModalClose";

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      markdown: null
    }
  }

  componentDidMount() {
    fetch(this.props.markdownPath)
      .then(response => {
        return response.text()
      })
      .then(text => {
        this.setState({
          markdown: marked(text)
        })
      });
      
    setTimeout(() => {
      const scrollPoint = document.getElementById('modal-scroll-point');
      if (scrollPoint != null && !this.subtitleVisible()) {
        scrollPoint.scrollIntoView( { behavior: "smooth", block: "start" } );
      }
    }, 2000);

    const container = document.getElementsByClassName('modal-container')[0];
    container.addEventListener('scroll', this.onScroll.bind(this));
  }

  componentWillUnmount() {
    const container = document.getElementsByClassName('modal-container')[0];
    container.removeEventListener('scroll', this.onScroll.bind(this));
  }

  subtitleVisible() {
    const subtitle = document.getElementById('modal-subtitle');
    const thisY = subtitle.getBoundingClientRect().top;
    return thisY < (window.innerHeight * 0.9);
  }

  onScroll(event) {
    const subtitle = document.getElementById('modal-subtitle');
    subtitle.style.transform = 
      this.subtitleVisible() ? 
      "translateY(0%)" :
      "translateY(120%)";
  }

  render() {
    return (
      <div className="modal-container" style={{opacity: this.props.visible ? "1" : "0"}}>
        <ModalClose closeModal={this.props.closeModal}/>
        <div className="modal-text">
          <section>
            <article dangerouslySetInnerHTML={{__html: this.state.markdown}}></article>
          </section>
        </div>
      </div>
    );
  }
}

export default Modal;