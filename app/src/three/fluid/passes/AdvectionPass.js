import {
  BufferAttribute,
  BufferGeometry,
  Mesh,
  RawShaderMaterial,
  Scene,
  Texture,
  Uniform
} from "three";

import * as Utils from "../Utils";
  
class AdvectionPass {

  constructor(initialVelocity, initialValue, decay) {
    this.initialVelocity = initialVelocity;
    this.initialValue = initialValue;
    this.decay = decay;
    this.scene = new Scene();
    const geometry = Utils.FullscreenQuad();
    this.material = this.createMaterial();
    this.mesh = new Mesh(geometry, this.material);
    this.mesh.frustumCulled = false; // Just here to silence a console error.
    this.scene.add(this.mesh);
  }

  setUniforms(uniforms) {
    if (uniforms.timeDelta !== undefined) {
      this.material.uniforms.timeDelta.value = uniforms.timeDelta;
    }
    if (uniforms.inputTexture !== undefined) {
      this.material.uniforms.inputTexture.value = uniforms.inputTexture;
    }
    if (uniforms.velocity !== undefined) {
      this.material.uniforms.velocity.value = uniforms.velocity;
    }
    if (uniforms.decay !== undefined) {
      this.material.uniforms.decay.value = uniforms.decay;
    }
  }

  createMaterial() {
    return new RawShaderMaterial({
      uniforms: {
        timeDelta: new Uniform(0.0),
        inputTexture: new Uniform(Texture.DEFAULT_IMAGE),
        velocity: new Uniform(Texture.DEFAULT_IMAGE),
        decay: new Uniform(this.decay)
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
      void main() {
        vUV = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `);
  }

  frag() {
    return (`
      precision highp float;
      precision highp int;
      varying vec2 vUV;
      uniform float timeDelta;
      uniform sampler2D inputTexture;
      uniform sampler2D velocity;
      uniform float decay;
      void main() {
        vec2 prevUV = fract(vUV - timeDelta * texture2D(velocity, vUV).xy);
        gl_FragColor = texture2D(inputTexture, prevUV) * (1.0 - decay);
      }
    `);
  }
}

export default AdvectionPass;