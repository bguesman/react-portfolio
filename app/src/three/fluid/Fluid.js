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
import AddForcePass from "./passes/AddForcePass";
import DivergencePass from "./passes/DivergencePass";
import JacobiPass from "./passes/JacobiPass";
import GradientSubtractionPass from "./passes/GradientSubtractionPass";
import AdvectionPass from "./passes/AdvectionPass";
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
      dt: 1/60,
      colorDecay: 0.0025
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
    this.addForcePass = new AddForcePass(this.resolution, this.config.radius);
    this.divergencePass = new DivergencePass();
    this.pressurePass = new JacobiPass();
    this.pressureSubtractionPass = new GradientSubtractionPass();
    this.velocityAdvectionPass = new AdvectionPass(null, null, 0);
    this.colorAdvectionPass = new AdvectionPass(null, null, this.config.colorDecay);
    this.compositePass = new CompositePass();

    // Recording touches
    this.inputTouches = [];
  }
  
  render() {
    // Advect the velocity by itself
    this.velocityAdvectionPass.setUniforms({ timeDelta: this.config.dt });
    this.v = this.velocityRT.set(this.renderer);
    this.renderer.render(this.velocityAdvectionPass.scene, this.camera);

    if (this.inputTouches.length > 0)
    {
      // Add forces to velocity for touches
      this.addForcePass.setUniforms({
        touches: this.inputTouches,
        radius: this.config.Radius,
        velocity: this.v
      });
      this.v = this.velocityRT.set(this.renderer);
      this.renderer.render(this.addForcePass.scene, this.camera);

      // Add color for touches
      this.addColorPass.setUniforms({
        touches: this.inputTouches,
        radius: this.config.radius,
        color: this.c
      });
      this.c = this.colorRT.set(this.renderer);
      this.renderer.render(this.addColorPass.scene, this.camera);
    }

    // Advect the color according to velocity
    this.colorAdvectionPass.setUniforms({
      timeDelta: this.config.dt,
      inputTexture: this.c,
      velocity: this.v,
      decay: this.config.colorDecay
    });
    this.c = this.colorRT.set(this.renderer);
    this.renderer.render(this.colorAdvectionPass.scene, this.camera);

    // Compute the divergence of the advected velocity vector field.
    this.divergencePass.setUniforms({
      timeDelta: this.config.dt,
      velocity: this.v
    });
    this.d = this.divergenceRT.set(this.renderer);
    this.renderer.render(this.divergencePass.scene, this.camera);

    // Compute the pressure gradient of the advected velocity vector field (using
    // jacobi iteration).
    this.pressurePass.setUniforms({ divergence: this.d });
    for (let i = 0; i < this.config.iterations; ++i) {
      this.p = this.pressureRT.set(this.renderer);
      this.renderer.render(this.pressurePass.scene, this.camera);
      this.pressurePass.setUniforms({ previousIteration: this.p });
    }

    // Substract the pressure gradient from to obtain a velocity vector field with
    // zero divergence.
    this.pressureSubtractionPass.setUniforms({
      timeDelta: this.config.dt,
      velocity: this.v,
      pressure: this.p
    });
    this.v = this.velocityRT.set(this.renderer);
    this.renderer.render(this.pressureSubtractionPass.scene, this.camera);

    // Feed the input of the advection passes with the last advected results.
    this.velocityAdvectionPass.setUniforms({
      inputTexture: this.v,
      velocity: this.v
    });
    this.colorAdvectionPass.setUniforms({
      inputTexture: this.c
    });

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
    // if (event.button === 0) {
    //   var rect = event.target.getBoundingClientRect();
    //   const x = ((event.clientX - rect.left) / this.mount.clientWidth) * this.aspect.x;
    //   const y = 1.0 - (event.clientY - rect.top) / this.mount.clientHeight;
    //   this.inputTouches.push({
    //     id: "mouse",
    //     input: new Vector4(x, y, 0, 0)
    //   });
    // }
  }
  
  onMouseMove(event) {
    if (this.inputTouches.length == 0) {
      var rect = event.target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / this.mount.clientWidth) * this.aspect.x;
      const y = 1.0 - (event.clientY - rect.top) / this.mount.clientHeight;
      this.inputTouches.push({
        id: "mouse",
        input: new Vector4(x, y, 0, 0)
      });
    }

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
    // if (event.button === 0) {
    //   this.inputTouches.pop();
    // }
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