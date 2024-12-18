import {
  PlaneGeometry,
  MeshStandardMaterial,
  MeshBasicMaterial,
  Mesh,
  Group,
  DoubleSide,
} from "three";
import { uploadTiff } from "./tiffUpload.js";

function createFloor(roomWidth, roomDepth, filePath) {
  const floor = new Group();
  const groundGeometry = new PlaneGeometry(roomWidth, roomDepth);
  const groundMaterial = new MeshBasicMaterial({
    side: DoubleSide,
    transparent: true,
    alphaTest: 0.5,
  });
  groundGeometry.rotateX(-Math.PI / 2);
  const ground = new Mesh(groundGeometry, groundMaterial);
  ground.material.depthTest = false;
  ground.userData.movable = false;

  const scoreFloor = uploadTiff(roomWidth, roomDepth, filePath);
  scoreFloor.userData.movable = false;
  //scoreFloor.material.depthTest = false;

  //floor.add(ground);
  floor.add(scoreFloor);
  floor.userData.movable = false;

  floor.animate = () => {};

  return floor;
}

export { createFloor };
