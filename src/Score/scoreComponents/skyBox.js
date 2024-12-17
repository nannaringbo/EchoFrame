import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  BackSide,
  DoubleSide,
} from "three";
import { createTexture } from "./createTexture.js";
function createSkyBox() {
  const sides = [];
  const materialArray = [];

  //Load TExtures for each side of the skyBox
  const ft = createTexture("./assets/textures/water.jpg");
  const bk = createTexture("./assets/textures/water.jpg");
  const up = createTexture("./assets/textures/water.jpg");
  const dn = createTexture("./assets/textures/water.jpg");
  const rt = createTexture("./assets/textures/water.jpg");
  const lf = createTexture("./assets/textures/water.jpg");
  sides.push(ft, bk, up, dn, rt, lf);

  sides.forEach((texture) => {
    let mesh = new MeshBasicMaterial({
      map: texture,
      side: DoubleSide,
      color: 0x74ccf4,
      transparent: true,

      opacity: 0.5,
    });
    materialArray.push(mesh);
  });

  const geometry = new BoxGeometry(10, 4, 10);
  const skyBox = new Mesh(geometry, materialArray);

  let time = 0;
  skyBox.animate = () => {
    time += 0.02;
    skyBox.position.y = Math.sin(time) * 0.4;
    skyBox.rotation.y += 0.0005;
  };
  return skyBox;
}
export { createSkyBox };
