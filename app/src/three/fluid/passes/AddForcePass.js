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
class AddForcePass {
  
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
    if (uniforms.velocity !== undefined) {
      this.material.uniforms.velocity.value = uniforms.velocity;
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
        velocity: new Uniform(Texture.DEFAULT_IMAGE)
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
      uniform sampler2D velocity;

      vec2 getForce(vec4 inputVec) {
        float d = distance(vScaledUV, inputVec.xy) / (4.0 * radius);
        float strength = 1.0 / max(d * d, 0.01);
        strength *= (inputVec.x < 0.0) ? 0.0 : 1.0;
        return strength * inputVec.zw;
      }
      
      void main() {
        vec4 touchForce = vec4(0.0);
        touchForce.xy += getForce(input0);
        touchForce.xy += getForce(input1);
        touchForce.xy += getForce(input2);
        touchForce.xy += getForce(input3);
        touchForce.xy += getForce(input4);
        touchForce.xy += getForce(input5);
        touchForce.xy += getForce(input6);
        touchForce.xy += getForce(input7);
        touchForce.xy += getForce(input8);
        touchForce.xy += getForce(input9);
        gl_FragColor = texture2D(velocity, vUV) + vec4(touchForce.x, touchForce.y, 0, 1);
      }
    `);
  }
}

export default AddForcePass;