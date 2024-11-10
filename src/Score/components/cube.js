import {
  BoxGeometry,
  Mesh,
  MeshStandardMaterial,
  MeshBasicMaterial,
  MeshNormalMaterial,
  TextureLoader,
} from "three";
import { createTexture } from "./createTexture.js";

function createCube() {
  // create a geometry
  const geometry = new BoxGeometry(1, 1, 1);

  // create a default (white) Basic material
  //const material = new MeshNormalMaterial(); //For no texture

  const texture = createTexture("./assets/textures/CrumbledPlastic.png");
  const material = new MeshStandardMaterial({ map: texture });

  // create a Mesh containing the geometry and material
  const cube = new Mesh(geometry, material);
  cube.animate = () => {
    //cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
  };
  cube.userData.movable = true;
  return cube;
}

export { createCube };
