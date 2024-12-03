import { Vector3, Raycaster, BufferGeometry, Line } from "three";
import { createPicker } from "./picker.js";

function createController(renderer) {
  let controller;
  const raycaster = new Raycaster();
  let intersected = [];
  let moving = false;

  //const picker = createPicker(scene, camera, renderer);
  controller = renderer.xr.getController(0);
  // controller.addEventListener("selectstart", onSelectStart);
  // controller.addEventListener("selectend", onSelectEnd);

  // function onSelectStart(event) {
  //   console.log("onSelectStart");

  //   const controller = event.target;
  //   const pickedObject = picker.pickedObject;
  //   console.log("pickedObject:", pickedObject);
  //   if (pickedObject) {
  //     pickUpObject(pickedObject, controller);
  //   }
  // }

  // function onSelectEnd(event) {
  //   console.log("onSelectEnd");
  //   const controller = event.target;
  //   const pickedObject = picker.pickedObject;
  //   console.log("pickedObject put down:", pickedObject);
  //   putDownObject(pickedObject, controller, scene);
  //}

  controller.animate = () => {};

  return controller;
}
export { createController };

// function pickUpObject(pickedObject, controller) {
//   if (pickedObject) {
//     console.log("pickedObject in pickUpObject:", pickedObject);
//     controller.attach(pickedObject);
//     controller.userData.selected = pickedObject;
//     console.log("Object picked up:", pickedObject.name || pickedObject);

//     //Stop the animation loop of the object, while it is selected
//     // const index = toAnimate.indexOf(object);
//     // if (index !== -1) toAnimate.splice(index, 1);
//   }
// }

// function putDownObject(pickedObject, controller, scene) {
//   if (controller.userData.selected !== undefined) {
//     console.log("pickedObject in putDownObject:", pickedObject);
//     const object = controller.userData.selected;

//     //Place the object inside the scene again, at the position where SelectEnd is called. Object is automatically detached form controller.
//     scene.attach(pickedObject);
//     controller.userData.selected = undefined;

//     console.log("Object put down:", pickedObject.name || pickedObject);

//     //continues the animation loop of the object, after it has been placed back into the scene
//     // if (!toAnimate.includes(object)) {
//     //   toAnimate.push(object); //pushes the object into the animation loop
//     //   console.log("toAnimate in onSelectEnd", toAnimate);
//     // }
//   }
// }
