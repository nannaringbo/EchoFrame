import { createCamera } from "./components/camera.js";
import { createScene } from "./components/scene.js";
import { createControls } from "./systems/controls.js";
import { createXRRenderer } from "./systems/xrRenderer.js";
import { createARLights } from "./components/arLights.js";
import { setWorldPosition } from "./components/worldPosition.js";
import { createCube } from "./components/cube.js";
import { createLights } from "./components/light.js";
import { createPicker } from "./components/picker.js";

import { Vector3, GridHelper } from "three";

let camera;
let renderer;
let scene;
let toAnimate = [];

class Score4 {
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

    //Add functionality for user interactions below:

    //Picker
    const picker = createPicker(scene, camera, renderer, toAnimate);
    toAnimate.push(picker);

    //Add 3D objects and the different score elements below:

    //Example of defining and initializing a cube:

    const cube = createCube(0.5, 0.5, 0.5); //Call the createCube function to create a cube

    scene.add(cube); //Add the cube to the Three.js scene

    toAnimate.push(cube); //Add the cube to the list of objects to animate, to enable continuous rendering

    const cubeWP = new Vector3(-1, 0, -1); //Define the position of the cube in the room, using the Vector3 class from Three.js. The center of the cube, will then be positioned on this vector. For the y-axis: Use groundposition to place on the ground and 0 to place at the height of the users eyes. On the x axis: use -1 to place right in front of the user, numbers below -1 moves it away from the user along the x-axis. On the z-axis: use -1 to place the cube in front of the user, and numbers below -1 moves it further away from the user on teh y-axis. Using the same numbers on the x and z axis, will place the cube along the centerline of the user.

    setWorldPosition(cube, cubeWP); //Set the world position of the cube, to define its position inside the Three.js scene. The world position makes sure that it is placed according to the room dimensions, and should be defined for each object that is added to the scene.

    console.log("cubeWP:", cubeWP);
    console.log("cube position:", cube.position);

    //Helpers that can be used for testing
    const gridHelper = new GridHelper(roomDepth, roomDepth);
    gridHelper.position.y = groundPosition;
    scene.add(gridHelper);

    //Set scale of the scene, to match measurements of physical environment

    //scene.scale.set(0.5, 0.5, 0.5);
    // console.log("scene:", scene);
    // console.log("ground:", ground);

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
export { Score4 };
