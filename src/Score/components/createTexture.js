import { TextureLoader } from "three";

function createTexture(filepath) {
  // create a texture loader.
  const textureLoader = new TextureLoader();
  // load a texture
  const texture = textureLoader.load(filepath);
  return texture;
}
export { createTexture };
