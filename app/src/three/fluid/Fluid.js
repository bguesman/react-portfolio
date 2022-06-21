import * as THREE from "three";

// This implementation is based largely on https://github.com/amsXYZ/three-fluid-sim

class ThreeFluid {

  // This object is constructed when its parent react component is loaded
  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setClearColor( 0xffffff, 1);
    document.body.appendChild( this.renderer.domElement );
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0xeb4034 } );
    // Keep a reference to the cube since we'll animate it.
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
    this.camera.position.z = 5;

    this.registerListeners();

    this.animate();
  }
  
  render() {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.render();
  }
  

/*************************************************************************/
/******************************* LISTENERS *******************************/
/*************************************************************************/

  registerListeners() {
    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

/*************************************************************************/
/***************************** END LISTENERS *****************************/
/*************************************************************************/

}

export default ThreeFluid;