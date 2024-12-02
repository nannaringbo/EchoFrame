import { AmbientLight, DirectionalLight, HemisphereLight } from "three";

function createLights() {
  //const ambientLight = new Ambient(0xffffbb, 0x080820, 0.4);
  const ambientLight = new AmbientLight(0xffffbb, 20);
  const mainLight = new DirectionalLight(0xfffceb, 4);

  ambientLight.position.set(20, 10, 10);
  // move the light right, up, and towards us
  mainLight.position.set(3, 5, 3);

  return mainLight;
}

export { createLights };
