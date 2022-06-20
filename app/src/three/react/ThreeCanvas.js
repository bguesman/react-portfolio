import React, { Component } from "react";
import ReactDOM from 'react-dom/client';
import * as THREE from "three";

class ThreeCanvas extends Component {

  componentDidMount() {
    // Put the three.js code we want here
    // === THREE.JS EXAMPLE CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0xffffff, 1);
    document.body.appendChild( renderer.domElement );
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0xeb4034 } );
    var cube = new THREE.Mesh( geometry, material );
    scene.add( cube );
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }

  render() {
    return (
      // This tells us to call componentDidMount on this div? I don't fully understand it.
      <div ref={ref => (this.mount = ref)} />
    )
  }

}

export default ThreeCanvas;
