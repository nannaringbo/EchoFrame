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
import { createPicker } from "./components/picker.js";

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

    // const cube = createCube();
    // scene.add(cube);
    // toAnimate.push(cube);
    // const cubeWP = new Vector3(0, groundPosition + userHeight - 0.2, -2);
    // setWorldPosition(cube, cubeWP);
    // console.log("cube movable:", cube.userData.movable);
    // cube.addEventListener("click", () => {
    //   alert("Cube clicked");
    // });

    //Picker
    const picker = createPicker(scene, camera, renderer);
    toAnimate.push(picker);

    //Boxes

    for (let i = 0; i < 3; i++) {
      const boxGeometry = new BoxGeometry(
        Math.random(1),
        0.5,

        Math.random(),

        32
      );
      const boxMaterial = new MeshStandardMaterial({ color: 0xfabe64 });
      const box = new Mesh(boxGeometry, boxMaterial);
      box.rotateX(Math.PI / 2);

      const boxWP = new Vector3(
        Math.floor(Math.random() * -5 + i / 0.7),
        groundPosition + box.geometry.parameters.depth / 2 + i,
        Math.floor(Math.random() * -3 + i / 0.7)
      );

      setWorldPosition(box, boxWP);
      scene.add(box);
    }

    //Stick
    const stickGeometry = new CylinderGeometry(0.01, 0.01, 1, 32);
    const stickMaterial = new MeshStandardMaterial({ color: 0x4bc92e });

    for (let i = 0; i < 15; i++) {
      const stick = new Mesh(stickGeometry, stickMaterial);
      stick.rotateX(Math.PI / 2);
      stick.rotateZ(Math.PI / 1.5 + i * -1.9);

      const stickWP = new Vector3(
        2 + i / 7.3,
        groundPosition + 0.01,
        2 + i / 11.3
      );
      setWorldPosition(stick, stickWP);
      scene.add(stick);
    }

    //Stick2
    // const stick2 = new Mesh(stickGeometry, stickMaterial);
    // stick2.rotateX(Math.PI / 2);
    // stick2.rotateY(Math.PI / 2);

    // const stick2WP = new Vector3(2.5, groundPosition, 3);
    // setWorldPosition(stick2, stick2WP);
    // scene.add(stick2);
    //Sphere
    const sphereGeometry = new SphereGeometry(1, 32, 16);
    const sphereMaterial = new MeshStandardMaterial({ color: 0xb30952 });
    const sphere = new Mesh(sphereGeometry, sphereMaterial);

    const sphereWP = new Vector3(-3, groundPosition + 1, -2);
    setWorldPosition(sphere, sphereWP);
    scene.add(sphere);
    //Torus Geometry
    const torusGeometry = new TorusGeometry(0.5, 0.1, 16, 100);
    const torusMaterial = new MeshStandardMaterial({ color: 0x91e6c9 });
    const torus = new Mesh(torusGeometry, torusMaterial);
    torus.rotateX(Math.PI / 2);

    const torusWP = new Vector3(-2, groundPosition, 1);
    setWorldPosition(torus, torusWP);
    scene.add(torus);

    //Arc
    const arcGeometry = new TorusGeometry(
      0.5,
      0.2,
      16,
      100,
      6.283185307179586 / 2
    );
    const arcMaterial = new MeshStandardMaterial({ color: 0xf2e38d });
    const arc = new Mesh(arcGeometry, arcMaterial);

    const arcWP = new Vector3(3, groundPosition, -2);
    setWorldPosition(arc, arcWP);
    scene.add(arc);

    //Tube
    class CustomSinCurve extends Curve {
      constructor(scale = 1) {
        super();
        this.scale = scale;
      }

      getPoint(t, optionalTarget = new Vector3()) {
        const tx = t * 3 - 1.5;
        const ty = Math.sin(2 * Math.PI * t);
        const tz = 0;

        return optionalTarget.set(tx, ty, tz).multiplyScalar(this.scale);
      }
    }

    const path = new CustomSinCurve(10);
    const geometry = new TubeGeometry(path, 100, 2, 20, false);
    const material = new MeshStandardMaterial({ color: 0x4287f5 });
    const tube = new Mesh(geometry, material);
    tube.rotateX(Math.PI / 2);
    tube.rotateZ(Math.PI / 3);
    tube.scale.set(0.1, 0.1, 0.1);

    const tubeWP = new Vector3(2, groundPosition + 0.2, 0);
    setWorldPosition(tube, tubeWP);
    scene.add(tube);

    //Helpers
    const gridHelper = new GridHelper(roomDepth, roomDepth);
    gridHelper.position.y = groundPosition;
    scene.add(gridHelper);

    //AR controller
    controller = createController(renderer, scene);
    scene.add(controller);
    toAnimate.push(controller);

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
