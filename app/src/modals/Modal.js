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
      document.getElementById('modal-scroll-point').scrollIntoView( { behavior: "smooth", block: "start" } );
    }, 2000);
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