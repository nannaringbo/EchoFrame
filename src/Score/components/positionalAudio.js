import {
  AudioListener,
  PositionalAudio,
  AudioLoader,
  TorusGeometry,
  MeshPhongMaterial,
  Mesh,
  BoxGeometry,
  MeshBasicMaterial,
} from "three";
import { PositionalAudioHelper } from "three/examples/jsm/helpers/PositionalAudioHelper.js";

function createPositionalAudio(camera, filepath) {
  // create an AudioListener and add it to the camera
  const listener = new AudioListener();
  camera.add(listener);

  // create the PositionalAudio object (passing in the listener)
  const sound = new PositionalAudio(listener);
  sound.setRefDistance(20);
  sound.setDirectionalCone(40, 50, 0.01);
  sound.setLoop(true);

  const helper = new PositionalAudioHelper(sound);
  sound.add(helper);

  function startAudioContext() {
    if (listener.context.state === "suspended") {
      listener.context.resume();
    }
  }

  // Add event listener for user gesture to start/resume the audio context
  window.addEventListener("click", startAudioContext);

  // load a sound and set it as the PositionalAudio object's buffer
  const audioLoader = new AudioLoader();
  audioLoader.load(filepath, function (buffer) {
    sound.setBuffer(buffer);
    sound.setRefDistance(20);
    sound.play();
  });

  // create an object for the sound to play from
  const torus = new TorusGeometry(0.3, 0.1);
  const material = new MeshPhongMaterial({ color: 0xff2200 });
  const mesh = new Mesh(torus, material);

  mesh.add(sound);

  mesh.animate = () => {};

  return mesh;
}
export { createPositionalAudio };
