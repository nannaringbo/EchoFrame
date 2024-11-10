import { XREstimatedLight } from "three/examples/jsm/webxr/XREstimatedLight.js";
import { HemisphereLight } from "three";

function createARLights(scene, renderer) {
  const initialLight = new HemisphereLight(0xffffbb, 0x080820, 1);
  //Define lights

  const xrLight = new XREstimatedLight(renderer);
  xrLight.addEventListener("estimationstart", () => {
    // Swap the default light out for the estimated one one we start getting some estimated values.
    scene.add(xrLight);
    scene.remove(initialLight);
    console.log("xrLight:", xrLight);

    // The estimated lighting also provides an environment cubemap, which we can apply here.
    if (xrLight.environment) {
      scene.environment = xrLight.environment;
    }
  });

  xrLight.addEventListener("estimationend", () => {
    // Swap the lights back when we stop receiving estimated values.
    scene.add(initialLight);
    scene.remove(xrLight);
    console.log("initialLight:", initialLight);
    //
    //environment
    new RGBELoader().load(
      "./assets/textures/reading_room_8k.hdr",
      function (texture) {
        texture.mapping = EquirectangularReflectionMapping;

        defaultEnvironment = texture;

        scene.environment = defaultEnvironment;
      }
    );

    // Revert back to the default environment.
    scene.environment = defaultEnvironment;
  });
  initialLight.userData.movable = false;
  xrLight.userData.movable = false;
  return initialLight, xrLight;
}

export { createARLights };
