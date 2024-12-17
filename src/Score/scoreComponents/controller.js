import { Vector3, Raycaster, BufferGeometry, Line } from "three";
import { createPicker } from "./picker.js";

function createController(renderer) {
  let controller;

  controller = renderer.xr.getController(0);

  controller.animate = () => {};

  return controller;
}
export { createController };
