import { Vector3, Raycaster, BufferGeometry, Line } from "three";
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory.js";

function createActivator(renderer, particlesGroup) {
  let controller;
  const raycaster = new Raycaster();
  let intersected = [];

  controller = renderer.xr.getController(0);
  controller.addEventListener("selectstart", onSelectStart);
  controller.addEventListener("selectend", onSelectEnd);

  function onSelectStart(event) {
    const controller = event.target;

    const intersections = getIntersections(controller);
    if (intersections.length > 0) {
      const intersection = intersections[0];
      const object = intersection.object;

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
  }

  function onSelectEnd(event) {
    const controller = event.target;

    if (controller.userData.selected !== undefined) {
      const object = controller.userData.selected;
      controller.userData.selected = undefined;
    }
  }

  function getIntersections(controller) {
    controller.updateMatrixWorld();
    raycaster.setFromCamera({ x: 0, y: 0 }, renderer.xr.getCamera());

    // Perform raycasting with the particles group
    const movableObjects = raycaster
      .intersectObjects(particlesGroup.children, true)
      .filter((intersection) => intersection.object.userData.movable);

    return movableObjects;
  }

  function intersectObjects() {
    if (controller.userData.selected !== undefined) return;
    const intersections = getIntersections(controller);

    if (intersections.length > 0) {
      const intersection = intersections[0];
      const object = intersection.object;
      intersected.push(object);
    }
  }

  function resetIntersected() {
    while (intersected.length) {
      const object = intersected.pop();
    }
  }

  controller.animate = () => {
    resetIntersected();
    intersectObjects(controller);
  };

  controller.userData.movable = false;
  return controller;
}
export { createActivator };
