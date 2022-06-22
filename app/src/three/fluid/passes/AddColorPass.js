import {
  BufferAttribute,
  BufferGeometry,
  Mesh,
  RawShaderMaterial,
  Scene,
  Texture,
  Uniform,
  Vector2,
  Vector4
} from "three";
  
import * as Logging from "../../../logging/Logging"

import * as Utils from "../Utils";

const MAX_TOUCHES = 10;
class AddColorPass {
  
  constructor(resolution, radius) {
    this.resolution = resolution;
    this.radius = radius;
    this.scene = new Scene();
    const geometry = Utils.FullscreenQuad();
    this.material = this.createMaterial();
    this.mesh = new Mesh(geometry, this.material);
    this.mesh.frustumCulled = false; // Just here to silence a console error.
    this.scene.add(this.mesh);
  }

  setUniforms(uniforms) {
    if (uniforms.aspect !== undefined) {
      this.material.uniforms.aspect.value = uniforms.aspect;
    }
    if (uniforms.touches !== undefined) {
      const touchMax = Math.min(MAX_TOUCHES, uniforms.touches.length);
      for (let i = 0; i < touchMax; ++i) {
        this.material.uniforms["input" + i].value = uniforms.touches[i].input;
      }
      for (let i = uniforms.touches.length; i < MAX_TOUCHES; ++i) {
        this.material.uniforms["input" + i].value.set(-1, -1, -1, -1);
      }
    }
    if (uniforms.radius !== undefined) {
      this.material.uniforms.radius.value = uniforms.radius;
    }
    if (uniforms.color !== undefined) {
      this.material.uniforms.color.value = uniforms.color;
    }
  }

  createMaterial() {
    return new RawShaderMaterial({
      uniforms: {
        aspect: new Uniform(new Vector2(this.resolution.x / this.resolution.y, 1.0)),
        input0: new Uniform(new Vector4()),
        input1: new Uniform(new Vector4()),
        input2: new Uniform(new Vector4()),
        input3: new Uniform(new Vector4()),
        input4: new Uniform(new Vector4()),
        input5: new Uniform(new Vector4()),
        input6: new Uniform(new Vector4()),
        input7: new Uniform(new Vector4()),
        input8: new Uniform(new Vector4()),
        input9: new Uniform(new Vector4()),
        radius: new Uniform(this.radius),
        color: new Uniform(Texture.DEFAULT_IMAGE)
      },
      vertexShader: this.vert(),
      fragmentShader: this.frag(),
      depthTest: false,
      depthWrite: false
    });
  }

  vert() {
    return (`
      attribute vec2 position;
      varying vec2 vUV;
      varying vec2 vScaledUV;
      uniform vec2 aspect;
      void main() {
        vUV = position * 0.5 + 0.5;
        vScaledUV = position * aspect * 0.5 + aspect * 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `);
  }

  frag() {
    return (`
      precision highp float;
      precision highp int;
      varying vec2 vUV;
      varying vec2 vScaledUV;
      uniform vec4 input0;
      uniform vec4 input1;
      uniform vec4 input2;
      uniform vec4 input3;
      uniform vec4 input4;
      uniform vec4 input5;
      uniform vec4 input6;
      uniform vec4 input7;
      uniform vec4 input8;
      uniform vec4 input9;
      uniform float radius;
      uniform sampler2D color;

      float getTouchIntensity(vec4 inputVec) {
        float d = distance(vScaledUV, inputVec.xy) / radius;
        float strength = 1.0 / max(d * d, 0.01);
        strength *= (inputVec.x < 0.0) ? 0.0 : 1.0;
        return strength;
      }
      
      void main() {
        float touchIntensity = 0.0;
        touchIntensity += getTouchIntensity(input0);
        touchIntensity += getTouchIntensity(input1);
        touchIntensity += getTouchIntensity(input2);
        touchIntensity += getTouchIntensity(input3);
        touchIntensity += getTouchIntensity(input4);
        touchIntensity += getTouchIntensity(input5);
        touchIntensity += getTouchIntensity(input6);
        touchIntensity += getTouchIntensity(input7);
        touchIntensity += getTouchIntensity(input8);
        touchIntensity += getTouchIntensity(input9);
        gl_FragColor = texture2D(color, vUV) + vec4(touchIntensity, touchIntensity, touchIntensity, 1);
      }
    `);
  }
}

export default AddColorPass;