import { PerspectiveCamera, MathUtils } from "three";

function createCamera() {
  const fov = 60; // AKA Field of View
  const aspect = 1;
  const near = 0.1; // the near clipping plane
  const far = 100; // the far clipping plane

  const camera = new PerspectiveCamera(fov, aspect, near, far);

  // move the camera back so we can view the scene
  //camera.position.set(0, 0, 0);
  // const radiansPerSecond = MathUtils.degToRad(1);

  // let incrementing = true;
  // camera.animate = () => {
  //   if (incrementing) {
  //     camera.position.z += 0.01;
  //     camera.position.x += 0.01;
  //     camera.rotation.z += (radiansPerSecond * delta) / 2;
  //     camera.rotation.x += (radiansPerSecond * delta) / 2;

  //     if (
  //       camera.position.z >= 100 ||
  //       camera.position.x >= 5 ||
  //       camera.position.y >= 5
  //     ) {
  //       incrementing = false;
  //     }
  //   } else {
  //     camera.position.z -= 0.01;
  //     camera.position.x -= 0.01;
  //     camera.rotation.z -= (radiansPerSecond * delta) / 2;
  //     camera.rotation.x -= (radiansPerSecond * delta) / 2;

  //     if (
  //       camera.position.z <= 0.1 ||
  //       camera.position.x <= -5 ||
  //       camera.position.y <= -5
  //     ) {
  //       incrementing = true;
  //     }
  //   }
  // };

  camera.userData.movable = false;
  return camera;
}

export { createCamera };
