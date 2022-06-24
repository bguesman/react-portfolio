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
  
class CurlPass {

  constructor() {
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
    if (uniforms.density !== undefined) {
      this.material.uniforms.density.value = uniforms.density;
    }
    if (uniforms.velocity !== undefined) {
      this.material.uniforms.velocity.value = uniforms.velocity;
    }
  }

  createMaterial() {
    return new RawShaderMaterial({
      uniforms: {
        timeDelta: new Uniform(0.0),
        velocity: new Uniform(Texture.DEFAULT_IMAGE)
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
      uniform float timeDelta;
      uniform sampler2D velocity;
      out vec4 outColor;
      void main() {
        vec2 texelSize = vec2(dFdx(vUV.x), dFdy(vUV.y));
        
        float x0 = texture(velocity, vUV - vec2(0, texelSize.y)).x;
        float x1 = texture(velocity, vUV + vec2(0, texelSize.y)).x;
        float y0 = texture(velocity, vUV - vec2(texelSize.x, 0)).y;
        float y1 = texture(velocity, vUV + vec2(texelSize.x, 0)).y;
        float curl = ((y1 - y0) - (x1 - x0)) * 0.5;
        
        outColor = vec4(curl);
      }
    `);
  }
}

export default CurlPass;