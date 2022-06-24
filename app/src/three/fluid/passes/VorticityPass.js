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
  
class VorticityPass {

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
    if (uniforms.curl !== undefined) {
      this.material.uniforms.curl.value = uniforms.curl;
    }
    if (uniforms.vorticity !== undefined) {
      this.material.uniforms.vorticity.value = uniforms.vorticity;
    }
  }

  createMaterial() {
    return new RawShaderMaterial({
      uniforms: {
        timeDelta: new Uniform(0.0),
        velocity: new Uniform(Texture.DEFAULT_IMAGE),
        curl: new Uniform(Texture.DEFAULT_IMAGE),
        vorticity: new Uniform(0.0),
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
      uniform float vorticity;
      uniform float timeDelta;
      uniform sampler2D velocity;
      uniform sampler2D curl;
      out vec4 outColor;
      void main() {
        vec2 texelSize = vec2(dFdx(vUV.x), dFdy(vUV.y));
        
        float x0 = texture(curl, vUV - vec2(texelSize.x, 0)).x;
        float x1 = texture(curl, vUV + vec2(texelSize.x, 0)).x;
        float y0 = texture(curl, vUV - vec2(0, texelSize.y)).y;
        float y1 = texture(curl, vUV + vec2(0, texelSize.y)).y;
        vec2 c = texture(curl, vUV).xy;
        vec4 v = texture(velocity, vUV);

        // Normalized gradient of the curl---this tells us the strength
        // of the curl in each direction.
        vec2 grad = vec2(abs(x1) - abs(x0), abs(y1) - abs(y0));
        grad = grad * vorticity / (length(grad) + 1e-6);

        vec2 vorticityForce = c * grad;
        
        outColor = v + timeDelta * vec4(vorticityForce.x, vorticityForce.y, 0, 0);
      }
    `);
  }
}

export default VorticityPass;