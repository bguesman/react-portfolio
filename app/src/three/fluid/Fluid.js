import {
  HalfFloatType,
  OrthographicCamera,
  RGBAFormat,
  Texture,
  TextureLoader,
  UnsignedByteType,
  Vector2,
  Vector4,
  WebGLRenderer
} from "three";

import * as Logging from "../../logging/Logging"

import RenderTarget from "./RenderTarget";

import AddColorPass from "./passes/AddColorPass";
import CompositePass from "./passes/CompositePass";


// This implementation is based largely on https://github.com/amsXYZ/three-fluid-sim

class ThreeFluid {

  // This object is constructed when its parent react component is loaded
  constructor(mount) {
    // Config options
    this.config = {
      iterations: 32,
      scale: 0.5,
      radius: 0.01, // In uv space
      dt: 1/60
    }

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

    this.renderer = new WebGLRenderer();
    this.renderer.setSize( this.mount.clientWidth, this.mount.clientHeight );
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.autoClear = false;
    this.mount.appendChild(this.renderer.domElement);
    this.camera = new OrthographicCamera(0, 0, 0, 0, 0, 0);

    this.resolution = new Vector2(
      this.config.scale * this.mount.clientWidth,
      this.config.scale * this.mount.clientHeight
    );
    this.aspect = new Vector2(this.resolution.x / this.resolution.y, 1.0);

    // Render targets
    this.velocityRT = new RenderTarget(this.resolution, 2, RGBAFormat, HalfFloatType);
    this.divergenceRT = new RenderTarget(this.resolution, 1, RGBAFormat, HalfFloatType);
    this.pressureRT = new RenderTarget(this.resolution, 2, RGBAFormat, HalfFloatType);
    this.colorRT = new RenderTarget(this.resolution, 2, RGBAFormat, UnsignedByteType);

    // Shader passes
    this.addColorPass = new AddColorPass(this.resolution, this.config.radius);
    this.compositePass = new CompositePass();

    // Recording touches
    this.inputTouches = [];
  }
  
  render() {
    this.addColorPass.setUniforms({
      touches: this.inputTouches,
      radius: this.config.radius,
      color: this.c
    });
    this.c = this.colorRT.set(this.renderer);
    this.renderer.render(this.addColorPass.scene, this.camera);

    // Render final composited result.
    this.renderer.setRenderTarget(null);
    this.compositePass.setUniforms({ colorBuffer: this.c });
    this.renderer.render(this.compositePass.scene, this.camera);
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
    this.mount.addEventListener('mousedown', this.onMouseDown.bind(this), false);
    this.mount.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    this.mount.addEventListener('mouseup', this.onMouseUp.bind(this), false);
    this.mount.addEventListener('touchstart', this.onTouchStart.bind(this), false);
    this.mount.addEventListener('touchmove', this.onTouchMove.bind(this), false);
    this.mount.addEventListener('touchend', this.onTouchEnd.bind(this), false);
    this.mount.addEventListener('touchcancel', this.onTouchCancel.bind(this), false);
  }

  deregisterListeners() {
    window.removeEventListener('resize', this.onWindowResize.bind(this), false);
    this.mount.removeEventListener('mousedown', this.onMouseDown.bind(this), false);
    this.mount.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
    this.mount.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
    this.mount.removeEventListener('touchstart', this.onTouchStart.bind(this), false);
    this.mount.removeEventListener('touchmove', this.onTouchMove.bind(this), false);
    this.mount.removeEventListener('touchend', this.onTouchEnd.bind(this), false);
    this.mount.removeEventListener('touchcancel', this.onTouchCancel.bind(this), false);
  }

  onWindowResize() {
    // const width = this.mount.clientWidth;
    // const height = this.mount.clientHeight;
    // Logging.log('width: ' + width);
    // Logging.log('height: ' + height);
    // this.renderer.setSize(width, height, false);
    // this.camera.aspect = width / height;
    // this.camera.updateProjectionMatrix();
    
    // this.renderer.render(this.scene, this.camera);
  }

  onMouseDown(event) {
    if (event.button === 0) {
      var rect = event.target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / this.mount.clientWidth) * this.aspect.x;
      const y = 1.0 - (event.clientY - rect.top) / this.mount.clientHeight;
      this.inputTouches.push({
        id: "mouse",
        input: new Vector4(x, y, 0, 0)
      });
    }
  }
  
  onMouseMove(event) {
    if (this.inputTouches.length > 0) {
      var rect = event.target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / this.mount.clientWidth) * this.aspect.x;
      const y = 1.0 - (event.clientY - rect.top) / this.mount.clientHeight;
      this.inputTouches[0].input
        .setZ(x - this.inputTouches[0].input.x)
        .setW(y - this.inputTouches[0].input.y);
        this.inputTouches[0].input.setX(x).setY(y);
    }
  }

  onMouseUp(event) {
    if (event.button === 0) {
      this.inputTouches.pop();
    }
  }

  onTouchStart(event) {
    var rect = event.target.getBoundingClientRect();
    for (var touch of event.changedTouches) {
      const x = ((event.clientX - rect.left) / this.mount.clientWidth) * this.aspect.x;
      const y = 1.0 - (event.clientY - rect.top) / this.mount.clientHeight;
      this.inputTouches.push({
        id: touch.identifier,
        input: new Vector4(x, y, 0, 0)
      });
    }
  }

  onTouchMove(event) {
    event.preventDefault();
    var rect = event.target.getBoundingClientRect();
    for (var touch of event.changedTouches) {
      var registeredTouch = this.inputTouches.find(value => {
        return value.id === touch.identifier;
      });
      if (registeredTouch !== undefined) {
        const x = ((event.clientX - rect.left) / this.mount.clientWidth) * this.aspect.x;
        const y = 1.0 - (event.clientY - rect.top) / this.mount.clientHeight;
        registeredTouch.input
          .setZ(x - registeredTouch.input.x)
          .setW(y - registeredTouch.input.y);
        registeredTouch.input.setX(x).setY(y);
      }
    }
  }

  onTouchEnd(event) {
    for (const touch of event.changedTouches) {
      const registeredTouch = this.inputTouches.find(value => {
        return value.id === touch.identifier;
      });
      if (registeredTouch !== undefined) {
        this.inputTouches = this.inputTouches.filter(value => {
          return value.id !== registeredTouch.id;
        });
      }
    }
  }

  onTouchCancel(event) {
    for (let i = 0; i < this.inputTouches.length; ++i) {
      for (let j = 0; j < event.touches.length; ++j) {
        if (this.inputTouches[i].id === event.touches.item(j).identifier) {
          break;
        } else if (j === event.touches.length - 1) {
          this.inputTouches.splice(i--, 1);
        }
      }
    }
  }

/*************************************************************************/
/***************************** END LISTENERS *****************************/
/*************************************************************************/

}

export default ThreeFluid;