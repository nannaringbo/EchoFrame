import {
  BufferGeometry,
  TextureLoader,
  SRGBColorSpace,
  Float32BufferAttribute,
  PointsMaterial,
  Points,
  SphereGeometry,
  BoxGeometry,
  Group,
  MeshStandardMaterial,
  Mesh,
  MeshPhongMaterial,
  MathUtils,
  Vector3,
  CircleGeometry,
  MeshBasicMaterial,
  DoubleSide,
} from "three";

function createAbsorb() {
  const geometry = new CircleGeometry(0.2, 16);
  const material = new MeshBasicMaterial({ color: "black", side: DoubleSide });
  const absorbCircle = new Mesh(geometry, material);

  absorbCircle.rotateX(-Math.PI / 2);

  absorbCircle.animate = () => {};

  return absorbCircle;
}
export { createAbsorb };
