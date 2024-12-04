import {
  BufferGeometry,
  TextureLoader,
  SRGBColorSpace,
  Float32BufferAttribute,
  PointsMaterial,
  Points,
  SphereGeometry,
  BoxGeometry,
  Group,
  MeshStandardMaterial,
  Mesh,
  MeshPhongMaterial,
  MathUtils,
} from "three";

import { createAbsorb } from "./absorb";

function createAbsorbParticles(numberOfParticles, particleSize) {
  const group = new Group();
  const particles = new Group();
  const absorbtionHole = createAbsorb();

  for (let i = 0; i < numberOfParticles; i++) {
    const particle = createNewParticle(particleSize);

    particles.add(particle);
  }

  //particles.scale.set(0.1, 0.1, 0.1);

  group.add(particles);

  group.add(absorbtionHole);

  group.animate = () => {
    particles.rotation.y += 0.03;

    //initial movement of Particles
    for (let i = 0; i < particles.children.length; i++) {
      if (particles.children[i].position.y <= absorbtionHole.position.y + 2) {
        //particles.children[i].position.y = absorbtionHole.position.y + 0.4;
        //particles.children[i].position.y -= 0.001;
        particles.children[i].speed += 0.0001;
      } else {
        particles.children[i].speed += 0.00001;
      }
    }
    // Absorbtion Movement
    for (let i = 0; i < particles.children.length; i++) {
      let currentX = particles.children[i].position.x;
      let currentY = particles.children[i].position.y;
      let currentZ = particles.children[i].position.z;
      let targetX = absorbtionHole.position.x;
      let targetY = absorbtionHole.position.y;
      let targetZ = absorbtionHole.position.z;
      let distanceX = currentX - targetX;
      let distanceY = currentY - targetY;
      let distanceZ = currentZ - targetZ;

      const speed = particles.children[i].speed;

      particles.children[i].position.set(
        currentX - distanceX * speed,
        currentY - distanceY * speed,
        currentZ - distanceZ * speed
        // circle.position.x,
        // circle.position.y,
        // circle.position.z
      );
      if (
        Math.abs(particles.children[i].position.x - targetX) < 0.1 &&
        Math.abs(particles.children[i].position.y - targetY) < 0.1 &&
        Math.abs(particles.children[i].position.z - targetZ) < 0.1
      ) {
        particles.remove(particles.children[i]); // Remove the particle from the group
        const newParticle = createNewParticle(particleSize);
        particles.add(newParticle);
        //particles.children[i].visible = false;
      }
    }
  };
  return group;
}
export { createAbsorbParticles };

function createNewParticle(particleSize) {
  const geometry = new SphereGeometry(particleSize);
  const material = new MeshPhongMaterial({
    color: "black",
  });
  const particle = new Mesh(geometry, material);

  particle.position.set(
    4 * Math.random() - 2,
    3 * Math.random() + 1.3,
    4 * Math.random() - 2
  );
  particle.speed = Math.random() * 0.003 + 0.001; // Random speed between 0.01 and 0.03
  return particle;
}
