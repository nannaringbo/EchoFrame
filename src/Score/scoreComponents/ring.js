import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  MeshNormalMaterial,
  TextureLoader,
  TorusGeometry,
} from "three";

function createRing(radius, tube) {
  const torusGeometry = new TorusGeometry(radius, tube, 16, 100);
  const torusMaterial = new MeshStandardMaterial({ color: 0x91e6c9 });
  const torus = new Mesh(torusGeometry, torusMaterial);
  torus.rotateX(Math.PI / 2);

  torus.animate = () => {};

  return torus;
}

export { createRing };
