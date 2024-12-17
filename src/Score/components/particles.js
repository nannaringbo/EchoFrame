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
  MeshBasicMaterial,
  AdditiveBlending,
  BackSide,
  DoubleSide,
} from "three";

function createParticles(numberOfParticles, particleSize) {
  const particles = new Group();

  const geometry = new SphereGeometry(particleSize, 32, 32);

  for (let i = 0; i < numberOfParticles; i++) {
    const material = new MeshStandardMaterial({
      color: 0xfafa05,
      metalness: 0.9,
      emissive: 0x000000,
      transparent: true,
      opacity: 0.9, // Slight transparency to make it look dimmer
    });
    const glowSphere = new Mesh(geometry, material);

    // Create a larger "glow sphere" around the main sphere
    const glowGeometry = new SphereGeometry(particleSize * 2, 32, 32);
    const glowMaterial = new MeshBasicMaterial({
      color: 0xfaf5c5,
      transparent: true,
      opacity: 0,
      blending: AdditiveBlending,
      side: DoubleSide,
    });
    const particle = new Mesh(glowGeometry, glowMaterial);

    particle.add(glowSphere);

    particle.position.set(
      20 * Math.random() - 10,
      12 * Math.random() - 6,
      20 * Math.random() - 10
    );
    particle.userData.isOn = false;
    particle.userData.movable = true;
    particles.add(particle);
  }

  particles.animate = () => {};
  return particles;
}
export { createParticles };
