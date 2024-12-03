import { Vector3, Raycaster, BufferGeometry, Line } from "three";
import { XRControllerModelFactory } from "three/examples/jsm/webxr/XRControllerModelFactory.js";

function createController(renderer, scene, toAnimate) {
  let controller;
  const raycaster = new Raycaster();
  let intersected = [];
  let moving = false;

  controller = renderer.xr.getController(0);
  controller.addEventListener("selectstart", onSelectStart);
  controller.addEventListener("selectend", onSelectEnd);

  function onSelectStart(event) {
    console.log("onSelectStart");
    const controller = event.target;

    const intersections = getIntersections(controller);
    console.log("intersections", intersections);
    console.log("intersections length", intersections.length);

    if (intersections.length > 0) {
      console.log("intersection", intersections);
      const intersection = intersections[0];
      console.log("intersection position 0", intersections[0]);

      //The selected object, which is the object in position 0 of the intersections array
      const object = intersection.object;
      console.log("intersection object", intersection.object);
      if (object.userData.movable) {
        controller.attach(object);
        controller.userData.selected = object;
        moving = true;
        //Stop the animation loop of the object, while it is selected
        const index = toAnimate.indexOf(object);
        if (index !== -1) toAnimate.splice(index, 1);
      }
    }

    controller.userData.targetRayMode = event.data.targetRayMode;
  }

  function onSelectEnd(event) {
    const controller = event.target;

    if (controller.userData.selected !== undefined) {
      const object = controller.userData.selected;

      //Place the object inside the scene again, at the position where SelectEnd is called. Object is automatically detached form controller.
      scene.attach(object);
      controller.userData.selected = undefined;
      moving = false;

      //continues the animation loop of the object, after it has been placed back into the scene
      if (!toAnimate.includes(object)) {
        toAnimate.push(object); //pushes the object into the animation loop
        console.log("toAnimate in onSelectEnd", toAnimate);
      }
    }
  }

  function getIntersections() {
    controller.updateMatrixWorld();

    raycaster.setFromCamera({ x: 0, y: 0 }, renderer.xr.getCamera());

    //filter objects from the array with intersected objects, to only include objects that are movable
    const movableObjects = raycaster
      .intersectObjects(scene.children, true)
      .filter((intersection) => intersection.object.userData.movable);

    console.log("movableObjects", movableObjects);
    return movableObjects;
  }

  function intersectObjects() {
    // Do not highlight in mobile-ar

    // if (controller.userData.targetRayMode === "screen") return;

    // Do not highlight when already selected
    if (controller.userData.selected !== undefined) return;

    // returns movable objects that are being intersected by controller
    const intersections = getIntersections(controller);
    console.log("intersections in intersectObjects", intersections);
    console.log(
      "intersections.length in intersectObjects",
      intersections.length
    );

    if (intersections.length > 0) {
      const intersection = intersections[0];

      const object = intersection.object;

      intersected.push(object);
      console.log("intersected in intersectObjects", intersected);
    }
  }

  function resetIntersected() {
    while (intersected.length) {
      const object = intersected.pop();

      //check whether object is already in the toAnimate array, if not, it should be pushed into the toAnimate array
      if (!toAnimate.includes(object)) {
        toAnimate.push(object);
        console.log("toAnimate in resetIntersected", toAnimate);
      }
    }
  }
  controller.animate = () => {
    resetIntersected(); //resets which objects are intersected
    intersectObjects(controller); //looks for intersected objects
  };

  controller.userData.movable = false;
  return controller;
}
export { createController };
