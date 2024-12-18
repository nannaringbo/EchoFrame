//Component created based on the example from https://threejs.org/manual/#en/webxr-look-to-select
import { Raycaster } from "three";
import { createController } from "./controller";

function createPicker(scene, camera, renderer, toAnimate) {
  const raycaster = new Raycaster();
  let pickedObject = null;
  let intersectedObjects = [];
  const pickPosition = { x: 0, y: 0 };

  const controller = createController(renderer);
  scene.add(controller);
  controller.addEventListener("selectstart", onSelectStart);
  controller.addEventListener("selectend", onSelectEnd);

  function pick(scene, camera) {
    raycaster.setFromCamera(pickPosition, camera);

    intersectedObjects = raycaster.intersectObjects(scene.children, true);
    if (intersectedObjects.length > 0) {
      if (intersectedObjects[0].object.userData.movable !== false) {
        pickedObject = intersectedObjects[0].object;
      }
    }
    return pickedObject;
  }
  function onSelectStart(event) {
    console.log("onSelectStart");
    const controller = event.target;
    pick(scene, camera);
    if (pickedObject) {
      controller.attach(pickedObject);
      if (toAnimate.includes(pickedObject)) {
        toAnimate.pop(pickedObject);
        pickedObject.userData.animates = true;
      }
    }
  }

  function onSelectEnd(event) {
    const controller = event.target;
    scene.attach(pickedObject);

    if (
      !toAnimate.includes(pickedObject) &&
      pickedObject.userData.animates == true
    ) {
      toAnimate.push(pickedObject);
    }
    pickedObject = null;
  }

  raycaster.animate = () => {};

  return raycaster;
}

export { createPicker };
