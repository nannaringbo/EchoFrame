//Component created based on the example from https://threejs.org/manual/#en/webxr-look-to-select
import { Raycaster } from "three";
import { createController } from "./controller";

function createPicker(scene, camera, renderer, toAnimate) {
  //let controller;
  const raycaster = new Raycaster();
  let pickedObject = null;
  let pickedObjectSavedColor;
  let intersectedObjects = [];
  const pickPosition = { x: 0, y: 0 };

  const controller = createController(renderer);
  scene.add(controller);
  controller.addEventListener("selectstart", onSelectStart);
  controller.addEventListener("selectend", onSelectEnd);

  function pick(scene, camera) {
    restoreColor(pickedObject, pickedObjectSavedColor);
    // cast a ray through the frustum
    raycaster.setFromCamera(pickPosition, camera);
    // get the list of objects the ray intersected
    intersectedObjects = raycaster.intersectObjects(scene.children, true);
    if (intersectedObjects.length > 0) {
      // pick the first object. It's the closest one
      pickedObject = intersectedObjects[0].object;

      highlightObject(pickedObject, pickedObjectSavedColor);
    }
    return pickedObject;
  }
  function onSelectStart(event) {
    console.log("onSelectStart");
    const controller = event.target;
    pick(scene, camera);
    if (pickedObject) {
      controller.attach(pickedObject);
      controller.userData.selected = pickedObject;
      //Stop the animation loop of the object, while it is selected
      const index = toAnimate.indexOf(pickedObject);
      if (index !== -1) toAnimate.splice(index, 1);
    }
  }

  function onSelectEnd(event) {
    console.log("onSelectEnd");
    const controller = event.target;
    //Place the object inside the scene again, at the position where SelectEnd is called. Object is automatically detached form controller.
    scene.attach(pickedObject);

    controller.userData.selected = undefined;
    //continues the animation loop of the object, after it has been placed back into the scene
    if (!toAnimate.includes(pickedObject)) {
      toAnimate.push(pickedObject); //pushes the object into the animation loop
      console.log("toAnimate in onSelectEnd", toAnimate);
    }
  }

  raycaster.animate = () => {
    pick(scene, camera);
    controller.animate();
  };

  return raycaster;
}

export { createPicker };

// restore the color if there is a picked object
function restoreColor(pickedObject, pickedObjectSavedColor) {
  if (pickedObject) {
    if (pickedObject.material && pickedObject.material.emissive) {
      pickedObject.material.emissive.setHex(pickedObjectSavedColor);
      pickedObject = null;
    }
  }
}

// save color of pickedObject and highligt it
function saveObjectColor(pickedObject, pickedObjectSavedColor) {
  if (pickedObject) {
    if (pickedObject.material && pickedObject.material.emissive) {
      pickedObjectSavedColor = pickedObject.material.emissive.getHex();
    }
  }
}

function highlightObject(pickedObject, pickedObjectSavedColor) {
  if (pickedObject) {
    if (pickedObject.material && pickedObject.material.emissive) {
      saveObjectColor(pickedObject, pickedObjectSavedColor);
      pickedObject.material.emissive.setHex(0xff0000); // Highlight color
    }
  }
}

function pickUpObject(pickedObject, controller) {
  if (pickedObject) {
    controller.attach(pickedObject);
    controller.userData.selected = pickedObject;
    console.log("Object picked up:", pickedObject.name || pickedObject);

    //Stop the animation loop of the object, while it is selected
    // const index = toAnimate.indexOf(object);
    // if (index !== -1) toAnimate.splice(index, 1);
  }
}

function putDownObject(pickedObject, controller, scene) {
  if (controller.userData.selected !== undefined) {
    const object = controller.userData.selected;

    //Place the object inside the scene again, at the position where SelectEnd is called. Object is automatically detached form controller.
    scene.attach(pickedObject);
    controller.userData.selected = undefined;

    console.log("Object put down:", pickedObject.name || pickedObject);

    //continues the animation loop of the object, after it has been placed back into the scene
    // if (!toAnimate.includes(object)) {
    //   toAnimate.push(object); //pushes the object into the animation loop
    //   console.log("toAnimate in onSelectEnd", toAnimate);
    // }
  }
}
