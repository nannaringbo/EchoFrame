import {
  Color,
  MeshBasicMaterial,
  DoubleSide,
  ShapeGeometry,
  Mesh,
  Group,
  BoxGeometry,
  Vector3,
} from "three";

import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { setWorldPosition } from "./worldPosition";

function createTextBox(message, fontSize, textcolor) {
  const geometry = new BoxGeometry(1.8, fontSize / 2, 0.5);
  const material = new MeshBasicMaterial({
    color: 0xdaf5ef,
    transparent: true,
    opacity: 0.4,
    side: DoubleSide,
  });
  const textBox = new Mesh(geometry, material);

  const loader = new FontLoader();
  loader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    function (font) {
      const color = new Color(textcolor);

      const matLite = new MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 1,
        side: DoubleSide,
      });

      const shapes = font.generateShapes(message, fontSize);

      const geometry = new ShapeGeometry(shapes);

      geometry.scale(0.1, 0.1, 0.1);

      const text = new Mesh(geometry, matLite);

      // Compute the bounding box of the text geometry
      text.geometry.computeBoundingBox();
      const boundingBox = text.geometry.boundingBox;

      // Center the text mesh based on its bounding box
      text.position.x = -(boundingBox.max.x - boundingBox.min.x) / 2;
      text.position.y = -(boundingBox.max.y - boundingBox.min.y) / 2;

      textBox.add(text);
    }
  );
  textBox.scale.set(0.5, 0.5, 0.5);
  textBox.userData.movable = true;

  textBox.animate = () => {};

  return textBox;
}
export { createTextBox };
