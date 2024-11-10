import { WebGLRenderer } from "three";

import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

function createXRRenderer() {
  const renderer = new WebGLRenderer({ antialias: true, alpha: true }); // TODO: use this for AR
  renderer.xr.enabled = true; // TODO: Enable WebXR
  renderer.xr.setReferenceSpaceType("viewer"); // TODO: use this for AR

  document.body.appendChild(
    ARButton.createButton(renderer, {
      requiredFeatures: ["anchors", "local-floor"],
      optionalFeatures: ["light-estimation", "depth-sensing", "bounded-floor"],
      depthSensing: {
        usagePreference: ["gpu-optimized"],
        dataFormatPreference: [],
      },
    })
  );

  return renderer;
}

export { createXRRenderer };
