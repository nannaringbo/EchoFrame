import { Vector3, Raycaster, BufferGeometry, Line } from "three";
import { createController } from "./controller";

function createActivator(scene, camera, renderer, toAnimate, particlesGroup) {
  const raycaster = new Raycaster();
  let pickedObject = null;
  let pickedObjectSavedColor;
  const pickPosition = { x: 0, y: 0 };

  let intersectedObjects = [];

  const controller = createController(renderer);
  scene.add(controller);
  controller.addEventListener("selectstart", onSelectStart);
  controller.addEventListener("selectend", onSelectEnd);

  function getIntersections(scene, camera) {
    // controller.updateMatrixWorld();
    raycaster.setFromCamera(pickPosition, camera);

    // Perform raycasting with the particles group
    intersectedObjects = raycaster.intersectObjects(scene.children, true);
    if (intersectedObjects.length > 0) {
      // pick the first object. It's the closest one
      pickedObject = intersectedObjects[0].object;
    }
    return pickedObject;
  }

  function onSelectStart(event) {
    const controller = event.target;

    const object = getIntersections(scene, camera);

    if (!object.userData.isOn) {
      object.material.opacity = 0.2;
      controller.userData.selected = object;
      particle.userData.isOn = true;
    }
    if (object.userData.isOn) {
      object.material.opacity = 0;
      controller.userData.selected = object;
      particle.userData.isOn = false;
    }
  }

  function onSelectEnd(event) {
    const controller = event.target;

    if (controller.userData.selected !== undefined) {
      const object = controller.userData.selected;
      controller.userData.selected = undefined;
    }
  }

  // function intersectObjects() {
  //   if (controller.userData.selected !== undefined) return;
  //   const intersections = getIntersections(controller);

  //   if (intersections.length > 0) {
  //     const intersection = intersections[0];
  //     const object = intersection.object;
  //     intersectedObjects.push(object);
  //   }
  // }

  // function resetIntersected() {
  //   while (intersectedObjects.length) {
  //     const object = intersectedObjects.pop();
  //   }
  // }

  raycaster.animate = () => {
    getIntersections(scene, camera);
    controller.animate();
    //resetIntersected();
    //intersectObjects(controller);
  };

  //controller.userData.movable = false;
  return controller;
}
export { createActivator };
