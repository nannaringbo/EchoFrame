import {
  SphereGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
} from "three";

function createMeshGroup() {
  // a group holds other objects
  // but cannot be seen itself
  const group = new Group();

  const geometry = new SphereGeometry(0.025, 16, 16);

  const material = new MeshStandardMaterial({
    color: "white",
  });

  const protoSphere = new Mesh(geometry, material);

  // add the protoSphere to the group
  // group.add(protoSphere);

  // create twenty clones
  // and add each to the group
  for (let i = -2; i < 2; i += 0.02) {
    const sphere = protoSphere.clone();

    // position the spheres on around a circle
    sphere.position.z = Math.cos(3 * Math.PI * i);
    sphere.position.x = Math.sin(3 * Math.PI * i);
    sphere.position.y = i * 2;

    //sphere.scale.multiplyScalar(0.1);

    group.add(sphere);
  }

  // every sphere inside the group will be scaled
  //group.scale.multiplyScalar(1.8);

  const radiansPerSecond = MathUtils.degToRad(30);

  // each frame, rotate the entire group of spheres
  group.animate = () => {
    group.rotation.y += 0.01;
  };

  return group;
}
export { createMeshGroup };
