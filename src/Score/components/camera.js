import { PerspectiveCamera, MathUtils } from "three";

function createCamera() {
  const fov = 70; // AKA Field of View
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.01; // the near clipping plane
  const far = 50; // the far clipping plane

  const camera = new PerspectiveCamera(fov, aspect, near, far);

  return camera;
}

export { createCamera };
