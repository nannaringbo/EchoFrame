import { createCamera } from "./components/camera.js";
import { createScene } from "./components/scene.js";
import { createControls } from "./systems/controls.js";
import { createXRRenderer } from "./systems/xrRenderer.js";
import { createARLights } from "./components/arLights.js";
import { setWorldPosition } from "./components/worldPosition.js";
import { createCube } from "./components/cube.js";
import { createLights } from "./components/light.js";
import { createPicker } from "./components/picker.js";
import { createText } from "./components/text.js";
import { createFloor } from "./components/floor.js";

import { Vector3, GridHelper } from "three";

let camera;
let renderer;
let scene;
let toAnimate = [];

class Score2 {
  constructor(container) {
    //NB: Measurements in Three.js are in meters!

    // Inser height of the user (or use an estimate)
    let userHeight = 1.65;

    // Set the ground position, to make sure that it matches with the users height
    let groundPosition = 0 - userHeight + 0.2;

    //Set the room dimensions - If the AR score will be used in other environments, you can scale the scene to match further down in the code
    let roomWidth = 20;
    let roomDepth = 20;

    // Required Three.js components and functionality
    camera = createCamera();
    scene = createScene();
    renderer = createXRRenderer(); //XR renderer to enable Augmented Reality functionalities
    container.append(renderer.domElement);
    const controls = createControls(camera, renderer.domElement);
    toAnimate.push(controls); //Add controls to the list of objects to animate
    renderer.setAnimationLoop(render); // set the animation loop

    //Set the starting point of the camera, to adjust the view according to the user (0 on y-axis is an estimated eye height of the user)
    const startingPoint = new Vector3(1, 0, 1);
    //camera.position.set(startingPoint.x, startingPoint.y, startingPoint.z);
    setWorldPosition(camera, startingPoint);

    //AR light - Adapts according to the light in the room (ONLY WORKS WHEN THE SCORE IS RUN IN AR - NOT IN THE BROWSER)
    // const arLight = createARLights(scene, renderer);
    // scene.add(arLight);
    // console.log("arLight movable:", arLight.userData.movable);

    //Use notmal light, if not interested in using AR Lights
    const lights = createLights();
    scene.add(lights);

    //Add 3D objects and the different score elements below:

    //Ground
    const ground = createFloor(
      roomWidth,
      roomDepth - roomDepth / 2.5,
      "./assets/textures/FloorMap_v2.tiff"
    );
    toAnimate.push(ground);
    scene.add(ground);
    //World position
    const groundWP = new Vector3(0, groundPosition, 0);
    setWorldPosition(ground, groundWP);

    //Words
    const wordsHeight = 0;

    //"Fitting In"
    const word1 = "Fitting In";
    const fittingIn = createText(word1, 2, "black");
    //World position
    const fittingInWP = new Vector3(4.5, wordsHeight, 0);
    setWorldPosition(fittingIn, fittingInWP);

    //"Walking"
    const word2 = "Walking";
    const walking = createText(word2, 2, "black");
    walking.rotateY(Math.PI / 2.5);
    //World position
    const walkingWP = new Vector3(-3.5, wordsHeight, 2);
    setWorldPosition(walking, walkingWP);

    //"Tracing"
    const word3 = "Tracing";
    const tracing = createText(word3, 2, "black");
    tracing.rotateY(Math.PI / 1.5);
    //World position
    const tracingWP = new Vector3(-6.5, wordsHeight, 4);
    setWorldPosition(tracing, tracingWP);

    //"Fixed point"
    const word6 = "Fixed point";
    const fixedPoint = createText(word6, 2, "black");
    fixedPoint.rotateY(Math.PI / -4);
    //World position
    const fixedPointWP = new Vector3(6, wordsHeight, -5.5);
    setWorldPosition(fixedPoint, fixedPointWP);

    //"Frog leap"
    const word7 = "Frog leap";
    const frogLeap = createText(word7, 2, "black");
    //World position
    const frogLeapWP = new Vector3(-5, wordsHeight, -3);
    setWorldPosition(frogLeap, frogLeapWP);

    //"Weaving"
    const word8 = "Weaving";
    const weaving = createText(word8, 2, "black");
    weaving.rotateY(Math.PI / -8);
    //World position
    const weavingWP = new Vector3(0, wordsHeight, 1.5);
    setWorldPosition(weaving, weavingWP);

    scene.add(fittingIn, walking, tracing, fixedPoint, frogLeap, weaving);

    //Helpers used for testing
    // const gridHelper = new GridHelper(roomDepth, roomDepth);
    // gridHelper.position.y = groundPosition;
    // scene.add(gridHelper);

    //Set scale of the scene, to match measurements of physical environment

    scene.scale.set(0.25, 0.25, 0.25);
    // console.log("scene:", scene);
    // console.log("ground:", ground);

    //Add functionality for user interactions below:

    //Event listener for resizing the window
    window.addEventListener("resize", onWindowResize);
  }
}
//Function to enable resize of the window
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}
//Render function to enable the AnimationLoop. Define a "animate" function for each component that needs to be called inside the AnimationLoop. When the component is initialized in the Score, add each element/object with an animate function to the "toAnimate" array, to make sure it will be rendered continuously inside the animation loop below.
function render(time) {
  time *= 0.001;

  for (const object of toAnimate) {
    object.animate();
  }

  renderer.render(scene, camera);
}
export { Score2 };
