import { PlaneGeometry, Mesh, MeshStandardMaterial, DoubleSide } from "three";

function createWall() {
  const geometry = new PlaneGeometry(2, 2);
  const material = new MeshStandardMaterial({
    color: "darkgray",
    side: DoubleSide,
  });
  const wall = new Mesh(geometry, material);
  wall.animate = () => {};
  return wall;
}
export { createWall };
