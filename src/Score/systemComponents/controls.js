import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls.js";
function createControls(camera, canvas) {
  const controls = new OrbitControls(camera, canvas);

  controls.enableDamping = true;
  controls.animate = () => controls.update();
  // const controls = new FirstPersonControls(camera, canvas);

  // controls.movementSpeed = 70;
  // controls.lookSpeed = 0.05;
  // controls.lookVertical = false;
  // controls.animate = () => controls.update();

  //For enabling/disabling modes
  //controls.enableRotate = false;
  //controls.enableZoom = false;
  //controls.enablePan = false;

  //For using navigtaion keys
  //controls.listenToKeyEvents(window);

  //For AutoRotate
  //controls.autoRotate = true;
  //controls.autoRotateSpeed = 1;

  //For limiting Zoom
  //controls.minDistance = 5;
  //controls.maxDistance = 50;

  //for limiting rotation
  //controls.minAzimuthAngle = - Infinity; // default
  //controls.maxAzimuthAngle = Infinity; // default
  //controls.minPolarAngle = 0; // default
  //controls.maxPolarAngle = Math.PI; // default

  return controls;
}

export { createControls };
