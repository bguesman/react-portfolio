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
  
class JacobiPass {

  constructor() {
    this.scene = new Scene();
    const geometry = Utils.FullscreenQuad();
    this.material = this.createMaterial();
    this.mesh = new Mesh(geometry, this.material);
    this.mesh.frustumCulled = false; // Just here to silence a console error.
    this.scene.add(this.mesh);
  }

  setUniforms(uniforms) {
    if (uniforms.previousIteration !== undefined) {
      this.material.uniforms.previousIteration.value =
        uniforms.previousIteration;
    }
    if (uniforms.divergence !== undefined) {
      this.material.uniforms.divergence.value = uniforms.divergence;
    }
  }

  createMaterial() {
    return new RawShaderMaterial({
      uniforms: {
        alpha: new Uniform(-1.0),
        beta: new Uniform(0.25),
        previousIteration: new Uniform(Texture.DEFAULT_IMAGE),
        divergence: new Uniform(Texture.DEFAULT_IMAGE)
      },
      vertexShader: this.vert(),
      fragmentShader: this.frag(),
      depthTest: false,
      depthWrite: false,
      extensions: { derivatives: true }
    });
  }

  // We need to use version WebGL version 300 ES for
  // screenspace derivatives support.
  vert() {
    return (`#version 300 es
      in vec2 position;
      out vec2 vUV;
      out vec4 vPosition;
      void main() {
        vUV = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
        vPosition = gl_Position;
      }
    `);
  }

  frag() {
    return (`#version 300 es
      precision highp float;
      precision highp int;
      in vec2 vUV;
      uniform float alpha;
      uniform float beta;
      uniform sampler2D previousIteration;
      uniform sampler2D divergence;
      out vec4 outColor;

      void main() {
        vec2 texelSize = vec2(dFdx(vUV.x), dFdy(vUV.y));
        
        vec4 x0 = texture(previousIteration, vUV - vec2(texelSize.x, 0));
        vec4 x1 = texture(previousIteration, vUV + vec2(texelSize.x, 0));
        vec4 y0 = texture(previousIteration, vUV - vec2(0, texelSize.y));
        vec4 y1 = texture(previousIteration, vUV + vec2(0, texelSize.y));
        vec4 d = texture(divergence, vUV);
        outColor = (x0 + x1 + y0 + y1 + alpha * d) * beta;
      }
    `);
  }
}

export default JacobiPass;