import { createCamera } from "./components/camera.js";
import { createScene } from "./components/scene.js";
import { Resizer } from "./systems/resizer.js";
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

import { Vector3 } from "three";

let camera;
let renderer;
let scene;
let toAnimate = [];
let controller;

class Score3 {
  constructor(container) {
    let userHeight = 1.65 * 2;
    let groundPosition = 0 - userHeight + 0.2;
    let roomWidth = 20;
    let roomDepth = 20;

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

    const startingPoint = new Vector3(0, userHeight - 0.2, 0);

    console.log("roomWidth:", roomWidth);
    console.log("roomDepth:", roomDepth);
    console.log("startingPoint:", startingPoint);
    console.log("groundPosition:", groundPosition);
    console.log("userHeight:", userHeight);
    camera.position.set(startingPoint.x, startingPoint.y, startingPoint.z);

    console.log("renderer", renderer);

    //AR lights
    const arLight = createARLights(scene, renderer);
    scene.add(arLight);
    console.log("arLight movable:", arLight.userData.movable);

    //Define objects

    // const cube = createCube();
    // scene.add(cube);
    // toAnimate.push(cube);
    // const cubeWP = new Vector3(1, groundPosition + 0.5, 1);
    // setWorldPosition(cube, cubeWP);
    // console.log("cube movable:", cube.userData.movable);

    // Helpers

    // const gridHelper = new GridHelper(roomDepth, roomDepth);
    // gridHelper.position.y = groundPosition;
    // scene.add(gridHelper);

    const resizer = new Resizer(container, camera, renderer);

    //AR controller
    // controller = createController(renderer, particles);
    // scene.add(controller);
    // toAnimate.push(controller);

    //scene.scale.set(0.5, 0.5, 0.5);
    //console.log("scene:", scene);
    //console.log("ground:", ground);

    function animate() {
      //put all logic for animation here

      //   const referenceSpace = renderer.xr.getReferenceSpace(); // TODO: use this for AR
      //   const session = renderer.xr.getSession(); //TODO: use this for AR
      for (const object of toAnimate) {
        object.animate();
      }

      renderer.render(scene, camera);
    }
  }
}

export { Score3 };
