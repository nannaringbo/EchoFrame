import { createCamera } from "./components/camera.js";
import { createScene } from "./components/scene.js";
import { Resizer } from "./systems/resizer(NOTINUSE).js";
import { createControls } from "./systems/controls.js";
import { createText } from "./components/text.js";
import { createXRRenderer } from "./systems/xrRenderer.js";
import { createController } from "./components/controller.js";
import { createFloor } from "./components/floor.js";
import { createARLights } from "./components/arLights.js";
import { setWorldPosition } from "./components/worldPosition.js";
import { createCube } from "./components/cube.js";
import { createParticles } from "./components/particles.js";
import { createLights } from "./components/light.js";
import { createPicker } from "./components/picker.js";
import { createBox } from "./components/box.js";
import { createStick } from "./components/stick.js";
import { createRing } from "./components/ring.js";
import { createArc } from "./components/arc.js";

import {
  Vector3,
  GridHelper,
  TubeGeometry,
  MeshBasicMaterial,
  Mesh,
  MeshStandardMaterial,
  Curve,
  TorusGeometry,
  SphereGeometry,
  CylinderGeometry,
  BoxGeometry,
} from "three";
import { createTube } from "./components/tube.js";

let camera;
let renderer;
let scene;
let toAnimate = [];
let controller;

class Score6 {
  constructor(container) {
    let userHeight = 1.65;
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

    renderer.setAnimationLoop(render);

    const startingPoint = new Vector3(0, userHeight - 0.2, 0);

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

    // const cube = createCube();
    // scene.add(cube);
    // toAnimate.push(cube);
    // const cubeWP = new Vector3(0, groundPosition + userHeight - 0.2, -2);
    // setWorldPosition(cube, cubeWP);
    // console.log("cube movable:", cube.userData.movable);

    //Picker
    const picker = createPicker(scene, camera, renderer, toAnimate);
    toAnimate.push(picker);

    //Boxes

    //Box1
    const box1 = createBox(0.3, 0.7);
    const box1WP = new Vector3(
      6.5,
      groundPosition + box1.geometry.parameters.height / 2,
      1
    );
    setWorldPosition(box1, box1WP);
    scene.add(box1);

    //Box2
    const box2 = createBox(0.4, 0.2);
    const box2WP = new Vector3(
      7,
      groundPosition + box2.geometry.parameters.height / 2,
      -1
    );
    setWorldPosition(box2, box2WP);
    scene.add(box2);

    //Box3
    const box3 = createBox(0.7, 0.5);
    const box3WP = new Vector3(
      7.2,
      groundPosition + box3.geometry.parameters.height / 2,
      0
    );
    setWorldPosition(box3, box3WP);
    scene.add(box3);

    //Box4
    const box4 = createBox(0.7, 0.4);
    const box4WP = new Vector3(
      6,
      groundPosition + box4.geometry.parameters.height / 2,
      0.1
    );
    setWorldPosition(box4, box4WP);
    scene.add(box4);

    //Stick

    for (let i = 0; i < 7; i++) {
      const stick = createStick(0.02, 1.2);

      const stickWP = new Vector3(
        1 + i / 7.3,
        groundPosition + 0.01,
        3 + i / 11.3
      );
      setWorldPosition(stick, stickWP);
      scene.add(stick);
    }

    //Sphere
    const sphereGeometry = new SphereGeometry(1, 32, 16);
    const sphereMaterial = new MeshStandardMaterial({ color: 0xb30952 });
    const sphere = new Mesh(sphereGeometry, sphereMaterial);
    const sphereWP = new Vector3(-3, groundPosition + 1, -2);
    setWorldPosition(sphere, sphereWP);
    scene.add(sphere);

    //Torus Geometry
    const ring = createRing(0.5, 0.1);
    const ringWP = new Vector3(-2, groundPosition, 1);
    setWorldPosition(ring, ringWP);
    scene.add(ring);

    //Arc
    const arc = createArc(1.7, 0.6);
    const arcWP = new Vector3(3, groundPosition, -5);
    setWorldPosition(arc, arcWP);
    arc.rotateY(Math.PI / 1.2);
    scene.add(arc);

    //Tube
    const tube = createTube(0.5, 2, true);
    const tubeWP = new Vector3(
      2,
      groundPosition + tube.geometry.parameters.height,
      0
    );
    setWorldPosition(tube, tubeWP);
    scene.add(tube);

    //Helpers
    const gridHelper = new GridHelper(roomDepth, roomDepth);
    gridHelper.position.y = groundPosition;
    scene.add(gridHelper);

    //scene.scale.set(0.5, 0.5, 0.5);
    // console.log("scene:", scene);
    // console.log("ground:", ground);

    window.addEventListener("resize", onWindowResize);
  }
}
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
function render(time) {
  time *= 0.001;

  for (const object of toAnimate) {
    object.animate();
  }

  renderer.render(scene, camera);
}
export { Score6 };
