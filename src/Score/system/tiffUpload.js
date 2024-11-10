import {
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  SRGBColorSpace,
  LinearSRGBColorSpace,
  DoubleSide,
  DynamicDrawUsage,
} from "three";
import { TIFFLoader } from "three/examples/jsm/loaders/TIFFLoader.js";

function uploadTiff(roomWidth, roomDepth, filePath) {
  const loader = new TIFFLoader();

  const geometry = new PlaneGeometry(
    roomWidth,
    roomDepth,
    roomWidth - 1,
    roomDepth - 1
  ); //change first two parameters to change size of plane. TODO: change these for AR
  geometry.rotateX(-Math.PI / 2);

  const mesh = new Mesh(geometry);

  loader.load(filePath, (texture) => {
    texture.colorSpace = LinearSRGBColorSpace;
    const material = new MeshBasicMaterial({
      map: texture,
      color: "white",
      side: DoubleSide,
      transparent: true,
      alphaTest: 0.5,
    });
    mesh.material = material;
    //mesh.position.y = 0; //TODO: change this for AR
  });

  mesh.animate = () => {};
  return mesh;
}

export { uploadTiff };
