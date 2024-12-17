import { Color, Scene, FogExp2 } from "three";

function createScene() {
  const scene = new Scene();
  //scene.background = new Color("Black");
  scene.userData.movable = false;
  return scene;
}

export { createScene };
