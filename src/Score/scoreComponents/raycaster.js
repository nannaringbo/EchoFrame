import { Raycaster, Vector2, Color } from "three";
function createRaycaster(camera, scene) {
  const raycaster = new Raycaster();
  const pointer = new Vector2();

  function onClick(event) {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
    console.log("ray ray");
    raycaster.setFromCamera(pointer, camera);

    const intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
      intersects[0].object.material.color.set(getRandomColor());
      console.log("you hit me");
    }
  }
  window.addEventListener("click", onClick);

  raycaster.animate = () => {
    raycaster.setFromCamera(pointer, camera);
  };

  return raycaster;
}
export { createRaycaster };

function getRandomColor() {
  const r = Math.floor(Math.random() * (255 - 1 + 1)) + 1;
  const g = Math.floor(Math.random() * (255 - 1 + 1)) + 1;
  const b = Math.floor(Math.random() * (255 - 1 + 1)) + 1;
  const randomColor = new Color(r / 255, g / 255, b / 255);
  return randomColor;
}
