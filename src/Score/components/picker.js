//Component created based on the example from https://threejs.org/manual/#en/webxr-look-to-select
import { Raycaster } from "three";

function createPicker(scene, camera, renderer) {
  const raycaster = new Raycaster();
  let pickedObject = null;
  let pickedObjectSavedColor;
  const pickPosition = { x: 0, y: 0 };

  renderer.domElement.addEventListener("touchstart", onTouchStart);
  renderer.domElement.addEventListener("touchend", onTouchEnd);
  renderer.domElement.addEventListener("touchmove", onTouchMove);

  function pick(scene, camera) {
    restoreColor(pickedObject, pickedObjectSavedColor);
    // cast a ray through the frustum
    raycaster.setFromCamera(pickPosition, camera);
    // get the list of objects the ray intersected
    const intersectedObjects = raycaster.intersectObjects(scene.children, true);
    if (intersectedObjects.length > 0) {
      // pick the first object. It's the closest one
      pickedObject = intersectedObjects[0].object;

      highlightObject(pickedObject, pickedObjectSavedColor);
    }
  }

  function onTouchStart(pickedObject, event) {
    if (event.touches.length === 1) {
      pickUpObject(pickedObject);
    }
  }

  function onTouchEnd(pickedObject, event) {
    if (event.touches.length === 1) {
      putDownObject(pickedObject);
    }
  }

  function onTouchMove(pickedObject, event) {
    if (event.touches.length === 1) {
      highlightObject(pickedObject);
    }
  }

  raycaster.animate = (time) => {
    pick(scene, camera, time);
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

function pickUpObject(pickedObject) {
  if (pickedObject) {
    console.log("Object picked up:", pickedObject.name || pickedObject);
  }
}

function putDownObject(pickedObject) {
  if (pickedObject) {
    console.log("Object put down:", pickedObject.name || pickedObject);

    restoreColor(pickedObject);
  }
}
