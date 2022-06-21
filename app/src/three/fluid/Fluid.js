import * as THREE from "three";

// This implementation is based largely on https://github.com/amsXYZ/three-fluid-sim

class ThreeFluid {

  // This object is constructed when its parent react component is loaded
  constructor(mount) {
    this.setupScene(mount);
    this.registerListeners();
    this.animate();
  }

  cleanup() {
    this.deregisterListeners();
    this.mount.removeChild(this.renderer.domElement);
  }

  setupScene(mount) {
    this.mount = mount;
    
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, this.mount.clientWidth/this.mount.clientHeight, 0.1, 1000 );
    this.camera.position.z = 5;
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( this.mount.clientWidth, this.mount.clientHeight );
    this.renderer.setClearColor( 0xffffff, 1);
    
    this.mount.appendChild(this.renderer.domElement);

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0xeb4034 } );
    // Keep a reference to the cube since we'll animate it.
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);
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

  deregisterListeners() {
    window.removeEventListener('resize', this.onWindowResize.bind(this), false);
  }

  onWindowResize() {
    // const width = this.mount.clientWidth;
    // const height = this.mount.clientHeight;
    // console.log('width: ' + width);
    // console.log('height: ' + height);
    // this.renderer.setSize(width, height, false);
    // this.camera.aspect = width / height;
    // this.camera.updateProjectionMatrix();
    
    // this.renderer.render(this.scene, this.camera);
  }

/*************************************************************************/
/***************************** END LISTENERS *****************************/
/*************************************************************************/

}

export default ThreeFluid;