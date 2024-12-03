import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  MeshNormalMaterial,
  TextureLoader,
  CylinderGeometry,
  Shape,
  ExtrudeGeometry,
} from "three";

function createTube(radius, length, openEnded) {
  const tubeGeometry = new CylinderGeometry(
    radius,
    radius,
    length,
    64,
    64,
    openEnded
  );

  const tubeMaterial = new MeshStandardMaterial({ color: 0xfffff });
  const tube = new Mesh(tubeGeometry, tubeMaterial);

  tube.animate = () => {};

  return tube;
}

export { createTube };
