import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

let loadedFont = null; // Variable to store the loaded font

function loadFont() {
  return new Promise((resolve, reject) => {
    if (loadedFont) {
      resolve(loadedFont); // If the font is already loaded, resolve immediately
      return;
    }

    const loader = new FontLoader();
    loader.load(
      "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
      (font) => {
        loadedFont = font; // Store the loaded font
        resolve(font); // Resolve the promise with the loaded font
      },
      undefined,
      (error) => {
        console.error("Error loading font:", error);
        reject(error); // Reject the promise if there’s an error
      }
    );
  });
}

export { loadFont };
