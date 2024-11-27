import { WebGLRenderer } from "three";

import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

function createXRRenderer() {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true }); // TODO: use this for AR
  renderer.xr.enabled = true; // TODO: Enable WebXR
  //renderer.xr.setReferenceSpaceType("viewer"); // TODO: use this for AR
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(
    ARButton.createButton(renderer, {
      requiredFeatures: ["local", "anchors", "hit-test"],
      // optionalFeatures: ["light-estimation", "depth-sensing"],
      // depthSensing: {
      //   usagePreference: ["gpu-optimized"],
      //   dataFormatPreference: [],
      // },
    })
  );

  return renderer;
}

export { createXRRenderer };
