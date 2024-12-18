import { Vector3, Raycaster, BufferGeometry, Line } from "three";
import { createController } from "./controller";

function createActivator(scene, camera, renderer, groupOfObjects, toAnimate) {
  const raycaster = new Raycaster();
  let pickedObject = null;

  const pickPosition = { x: 0, y: 0 };

  let intersectedObjects = [];

  const controller = createController(renderer);
  scene.add(controller);
  controller.addEventListener("selectstart", onSelectStart);
  controller.addEventListener("selectend", onSelectEnd);

  function getIntersections(groupOfObjects, camera) {
    raycaster.setFromCamera(pickPosition, camera);

    intersectedObjects = raycaster.intersectObjects(
      groupOfObjects.children,
      true
    );
    if (intersectedObjects.length > 0) {
      pickedObject = intersectedObjects[0].object;
      console.log(pickedObject);
    }
    return pickedObject;
  }

  function onSelectStart(event) {
    const controller = event.target;

    getIntersections(groupOfObjects, camera);

    if (toAnimate.includes(pickedObject)) {
      toAnimate.pop(pickedObject);
      pickedObject.userData.animates = true;
    }

    if (pickedObject.userData.isOn === false) {
      pickedObject.material.opacity = 0.2;
      pickedObject.userData.isOn = true;
    }
    //Uncomment the following lines to enable deactivation of the object
    // else if (pickedObject.userData.isOn === true) {
    //   pickedObject.material.opacity = 0;
    //   pickedObject.userData.isOn = false;
    // }
  }

  function onSelectEnd(event) {
    const controller = event.target;

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
export { createActivator };
