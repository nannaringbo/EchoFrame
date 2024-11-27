import { Raycaster, Vector2, Vector3 } from "three";

function createPickHelper(scene, camera) {
  const raycaster = new Raycaster();
  let pickedObject = null;
  let pickedObjectSavedColor = 0;
  const pickPosition = { x: 0, y: 0 };

  function pick(scene, camera, time) {
    // restore the color if there is a picked object
    if (pickedObject) {
      pickedObject.material.emissive.setHex(pickedObjectSavedColor);
      pickedObject = null;
    }

    // cast a ray through the frustum
    raycaster.setFromCamera(pickPosition, camera);
    // get the list of objects the ray intersected
    const intersectedObjects = raycaster.intersectObjects(scene.children);
    if (intersectedObjects.length) {
      // pick the first object. It's the closest one
      pickedObject = intersectedObjects[0].object;
      // save its color
      pickedObjectSavedColor = pickedObject.material.emissive.getHex();
      // set its emissive color to flashing red/yellow
      pickedObject.material.emissive.setHex(
        (time * 8) % 2 > 1 ? 0xffff00 : 0xff0000
      );
    }
  }
  raycaster.animate = (time) => {
    pick(scene, camera, time);
  };

  return raycaster;
}

export { createPickHelper };
