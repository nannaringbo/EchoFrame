import {
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  PointLight,
  Vector2,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

function createBloomEffect(renderer, scene, camera, controls) {
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);

  const bloomPass = new UnrealBloomPass(
    new Vector2(window.innerWidth, window.innerHeight),
    1.5, // Strength of bloom
    0.4, // Radius of bloom
    0.85 // Threshold of bloom
  );
  composer.addPass(bloomPass);

  composer.animate = () => {
    controls.update();
    composer.render();
  };
  return composer;
}
export { createBloomEffect };
