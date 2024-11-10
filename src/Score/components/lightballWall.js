import { Group } from "three";
import { createLightBall } from "./lightBall";
import { createWall } from "./wall";

function createLightballWall() {
  const lightBall = createLightBall();
  const wall = createWall();
  const group = new Group();

  group.add(lightBall);
  group.add(wall);

  lightBall.position.set(2, 0, 0);
  wall.position.set(-2.5, 0, 0.2);

  wall.rotateY(-Math.PI / 1.5);

  group.animate = () => {
    lightBall.animate();
  };

  return group;
}
export { createLightballWall };
