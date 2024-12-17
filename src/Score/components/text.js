import {
  Color,
  MeshBasicMaterial,
  DoubleSide,
  ShapeGeometry,
  Mesh,
  Group,
} from "three";

import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";

function createText(message, fontSize, textcolor) {
  const textObject = new Group();

  const loader = new FontLoader();
  loader.load(
    "https://threejs.org/examples/fonts/helvetiker_regular.typeface.json",
    function (font) {
      const color = new Color(textcolor);

      const matDark = new MeshBasicMaterial({
        color: color,
        side: DoubleSide,
      });

      const matLite = new MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.5,
        side: DoubleSide,
      });

      const shapes = font.generateShapes(message, fontSize);

      const geometry = new ShapeGeometry(shapes);

      geometry.computeBoundingBox();

      const xMid =
        -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

      geometry.translate(xMid, 0, 0);
      geometry.scale(0.1, 0.1, 0.1);

      const text = new Mesh(geometry, matLite);

      const holeShapes = [];

      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];

        if (shape.holes && shape.holes.length > 0) {
          for (let j = 0; j < shape.holes.length; j++) {
            const hole = shape.holes[j];
            holeShapes.push(hole);
          }
        }
      }

      shapes.push.apply(shapes, holeShapes);

      const style = SVGLoader.getStrokeStyle(0.2, color.getStyle());

      const strokeText = new Group();

      for (let i = 0; i < shapes.length; i++) {
        const shape = shapes[i];

        const points = shape.getPoints();

        const geometry = SVGLoader.pointsToStroke(points, style);

        geometry.translate(xMid, 0, 0);

        const strokeMesh = new Mesh(geometry, matDark);

        strokeText.add(strokeMesh);
      }
      strokeText.scale.set(0.1, 0.1, 0.1);
      textObject.add(text);
    }
  );

  textObject.animate = () => {};

  return textObject;
}
export { createText };
