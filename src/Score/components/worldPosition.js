import { Matrix4 } from "three";

//Helper function to set the world position of an object. This enables the use of the same coordinates when setting the position for each object inside the world
function setWorldPosition(object, worldPosition) {
  const localPosition = worldPosition.clone();
  const transformationMatrix = new Matrix4();

  if (object.parent) {
    object.parent.updateMatrixWorld(true);
    transformationMatrix.copy(object.parent.matrixWorld).invert();
    localPosition.applyMatrix4(transformationMatrix);
  }

  object.position.copy(localPosition);
}

export { setWorldPosition };
