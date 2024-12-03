import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  MeshNormalMaterial,
  TextureLoader,
  TorusGeometry,
} from "three";

function createArc(radius, tube) {
  const arcGeometry = new TorusGeometry(
    radius,
    tube,
    16,
    100,
    6.283185307179586 / 2
  );
  const arcMaterial = new MeshStandardMaterial({ color: 0xf2e38d });
  const arc = new Mesh(arcGeometry, arcMaterial);

  arc.animate = () => {};

  return arc;
}

export { createArc };
