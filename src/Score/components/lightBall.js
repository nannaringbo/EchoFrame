import {
  SphereGeometry,
  PointLight,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  MeshPhongMaterial,
  MathUtils,
  Clock,
  Vector3,
  CanvasTexture,
  RepeatWrapping,
  NearestFilter,
  DoubleSide,
} from "three";

function createLightBall(radius, color, lightIntensity) {
  const geometry = new SphereGeometry(radius, 12, 6);

  //lights

  const lightball = new PointLight(color, lightIntensity, 20);
  lightball.castShadow = true;
  lightball.shadow.bias = -0.005; // reduces self-shadowing on double-sided objects

  const material = new MeshBasicMaterial({ color: "#f0e785" });

  const sphere = new Mesh(geometry, material);

  lightball.add(sphere);

  const orbit = 0.5;
  const speed = 0.01;
  let angle = 0;

  // Initial world position
  const initialWorldPosition = new Vector3();

  lightball.animate = () => {
    if (initialWorldPosition.length() === 0) {
      // Set the initial world position only once
      lightball.getWorldPosition(initialWorldPosition);
    }
    angle += speed;

    //Orbit movement, relative to the initial worls position of the lightball
    lightball.position.x = initialWorldPosition.x + orbit * Math.cos(angle);
    lightball.position.z = initialWorldPosition.z + orbit * Math.sin(angle);

    //Updating the y position, to also make it move up/down
    lightball.position.y = initialWorldPosition.y + orbit * Math.sin(angle / 2);

    //rotation around own axises
    lightball.rotateX(speed);
    lightball.rotateZ(speed);

    // if (lightball.position.y >= 0) {
    //   lightball.up = false;
    // }
    // if (lightball.position.y <= -0.5) {
    //   lightball.up = true;
    // }

    // if (lightball.up == true) {
    //   lightball.position.y += 0.01;
    // } else {
    //   lightball.position.y -= 0.01;
    // }
  };
  return lightball;
}
export { createLightBall };
