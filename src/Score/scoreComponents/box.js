import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  MeshNormalMaterial,
  TextureLoader,
} from "three";

function createBox(width, height) {
  const boxGeometry = new BoxGeometry(width, height, 0.5, 32);

  const boxMaterial = new MeshStandardMaterial({ color: 0xfabe64 });
  const box = new Mesh(boxGeometry, boxMaterial);

  box.rotateY(Math.random() * Math.PI);
  box.animate = () => {};

  return box;
}

export { createBox };
