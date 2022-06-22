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
  
class CompositePass {

  constructor() {
    this.scene = new Scene();
    const geometry = Utils.FullscreenQuad();
    this.material = this.createMaterial();
    this.mesh = new Mesh(geometry, this.material);
    this.mesh.frustumCulled = false; // Just here to silence a console error.
    this.scene.add(this.mesh);
  }

  setUniforms(uniforms) {
    if (uniforms.colorBuffer !== undefined) {
      this.material.uniforms.colorBuffer.value = uniforms.colorBuffer;
    }
  }

  createMaterial() {
    return new RawShaderMaterial({
      uniforms: {
        colorBuffer: new Uniform(Texture.DEFAULT_IMAGE)
      },
      vertexShader: this.vert(),
      fragmentShader: this.frag(),
      depthTest: false,
      depthWrite: false,
      transparent: false
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
      uniform sampler2D colorBuffer;
      void main() {
        vec4 color = texture2D(colorBuffer, vUV);
        gl_FragColor = color;
      }
    `);
  }
}

export default CompositePass;