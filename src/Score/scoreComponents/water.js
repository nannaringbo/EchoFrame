import {
  PlaneGeometry,
  Vector2,
  CubeTextureLoader,
  Vector3,
  TextureLoader,
  RepeatWrapping,
  ShaderMaterial,
  Group,
  BoxGeometry,
  DoubleSide,
  SphereGeometry,
  BackSide,
} from "three";
import { Water } from "three/examples/jsm/objects/Water.js";

function createWater() {
  const waterGeometry = new BoxGeometry(11, 7, 11);
  const waterGroup = new Group();

  const waterTexture = new TextureLoader().load(
    "./assets/textures/waternormals.jpg",
    function (texture) {
      texture.wrapS = texture.wrapT = RepeatWrapping;
    }
  );
  const waterAlpha = 0.7;
  const waterDistortion = 1;
  const water1 = new Water(waterGeometry, {
    side: DoubleSide,
    textureWidth: 512,
    textureHeight: 512,
    waterNormals: waterTexture,

    alpha: waterAlpha,
    waterColor: 0x003f8f,
    distortionScale: waterDistortion,
  });

  const water1Uniforms = water1.material.uniforms;

  water1.animate = () => {
    const speed = 0.5;
    water1.material.uniforms["time"].value += speed / 60.0;
    water1.rotation.y += 0.0005;

    const time = performance.now() * 0.001;
  };

  return water1;
}
export { createWater };
