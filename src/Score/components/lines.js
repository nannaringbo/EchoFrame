import {
  Vector3,
  LineBasicMaterial,
  BufferGeometry,
  Line,
  Color,
  MathUtils,
  Group,
} from "three";

function createLines(max, min, numberOfLines, numberOfColors) {
  const lines = new Group();
  const colorScheme = [];
  for (let i = 0; i <= numberOfColors; i++) {
    colorScheme.push(getRandomColor());
  }

  for (let i = 0; i < numberOfLines; i++) {
    const material = new LineBasicMaterial({
      color: colorScheme[Math.floor(Math.random() * numberOfColors)],
    });

    const start = new getRandomVector3(max, min);

    const end = new getRandomVector3(max, min);

    const points = [start, end];
    const geometry = new BufferGeometry().setFromPoints(points);
    const line = new Line(geometry, material);

    lines.add(line);
  }

  lines.animate = () => {};
  return lines;
}

export { createLines };

function getRandomColor() {
  const r = Math.floor(Math.random() * (255 - 1 + 1)) + 1;
  const g = Math.floor(Math.random() * (255 - 1 + 1)) + 1;
  const b = Math.floor(Math.random() * (255 - 1 + 1)) + 1;
  const randomColor = new Color(r / 255, g / 255, b / 255);
  return randomColor;
}

function getRandomVector3(max, min) {
  const y = Math.floor(Math.random() * (max - min + 1) + min);
  const z = Math.floor(Math.random() * (max - min + 1) + min);
  const x = Math.floor(Math.random() * (max - min + 1) + min);
  const randomVector3 = new Vector3(x, y, z);
  return randomVector3;
}
