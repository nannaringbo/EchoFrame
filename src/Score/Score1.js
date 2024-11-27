import { createCamera } from "./components/camera.js";
import { createScene } from "./components/scene.js";
import { Resizer } from "./systems/resizer(NOTINUSE).js";
import { createControls } from "./systems/controls.js";
import { createText } from "./components/text.js";
import { createXRRenderer } from "./systems/xrRenderer.js";
import { createController } from "./systems/controller.js";
import { createFloor } from "./components/floor.js";
import { createARLights } from "./components/arLights.js";
import { setWorldPosition } from "./components/worldPosition.js";
import { createCube } from "./components/cube.js";
import { createParticles } from "./components/particles.js";
import { createLights } from "./components/light.js";
import { createPickHelper } from "./components/pickHelper.js";

import { Vector3, GridHelper } from "three";

let camera;
let renderer;
let scene;
let toAnimate = [];
let controller;

class Score1 {
  constructor(container) {
    let userHeight = 1.65;
    let groundPosition = 0 - userHeight + 0.2;
    let roomWidth = 10;
    let roomDepth = 10;

    console.log("roomDepth:", roomDepth);
    camera = createCamera();
    console.log("camera movable:", camera.userData.movable);
    scene = createScene();
    console.log("scene movable:", scene.userData.movable);
    renderer = createXRRenderer();
    console.log("scene:", scene);

    container.append(renderer.domElement);
    const controls = createControls(camera, renderer.domElement);
    toAnimate.push(controls);

    renderer.setAnimationLoop(animate);

    const startingPoint = new Vector3(0, 0, userHeight - 0.2);

    console.log("roomWidth:", roomWidth);
    console.log("roomDepth:", roomDepth);
    console.log("startingPoint:", startingPoint);
    console.log("groundPosition:", groundPosition);
    console.log("userHeight:", userHeight);
    camera.position.set(startingPoint.x, startingPoint.y, startingPoint.z);

    console.log("renderer", renderer);

    //AR lights
    // const arLight = createARLights(scene, renderer);
    // scene.add(arLight);
    // console.log("arLight movable:", arLight.userData.movable);

    //Lights
    const lights = createLights();
    scene.add(lights);

    //Define objects

    const cube = createCube();
    scene.add(cube);
    toAnimate.push(cube);
    const cubeWP = new Vector3(0, groundPosition + userHeight - 0.2, -2);
    setWorldPosition(cube, cubeWP);
    console.log("cube movable:", cube.userData.movable);
    cube.addEventListener("click", () => {
      alert("Cube clicked");
    });

    //PickHelper

    const pickHelper = createPickHelper(scene, camera);
    toAnimate.push(pickHelper);
    // Helpers
    // const gridHelper = new GridHelper(roomDepth, roomDepth);
    // gridHelper.position.y = groundPosition;
    // scene.add(gridHelper);

    //AR controller
    // controller = createController(renderer, scene);
    // scene.add(controller);
    // toAnimate.push(controller);

    //scene.scale.set(0.5, 0.5, 0.5);
    //console.log("scene:", scene);
    //console.log("ground:", ground);

    window.addEventListener("resize", onWindowResize);
  }
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate(time) {
  time *= 0.001;
  if (toAnimate.length > 0) {
    for (let i = 0; i < toAnimate.length; i++) {
      toAnimate[i].animate();
    }
  }

  renderer.render(scene, camera);
}
export { Score1 };
