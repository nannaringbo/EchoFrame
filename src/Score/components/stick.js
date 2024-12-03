import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  MeshNormalMaterial,
  TextureLoader,
  CylinderGeometry,
} from "three";

function createStick(radius, length) {
  const stickGeometry = new CylinderGeometry(radius, radius, length, 32);
  const stickMaterial = new MeshStandardMaterial({ color: 0x4bc92e });

  const stick = new Mesh(stickGeometry, stickMaterial);
  stick.rotateY(Math.PI / 1.5 + Math.floor(Math.random() * 5) * -1.9);
  stick.rotateX(Math.PI / 2);
  return stick;
}
export { createStick };
