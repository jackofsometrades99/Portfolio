// src/components/ThreeParticles.js
import React, { useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { createCircularTexture } from '../utils/circularTexture';

// Particle Controller Component
const ParticlesController = ({ geometry, spread, twinkleSpeed, twinklePhase }) => {
  const { mouse, camera, clock } = useThree();
  const raycaster = useMemo(() => new THREE.Raycaster(), [camera]);
  const intersectionPoint = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    if (!geometry) return;

    // Update the raycaster with the current mouse and camera
    raycaster.setFromCamera(mouse, camera);

    // Define interaction plane at z = 0
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    raycaster.ray.intersectPlane(plane, intersectionPoint);

    const elapsed = clock.getElapsedTime();

    const positions = geometry.attributes.position.array;
    const velocities = geometry.attributes.velocity.array;
    const colors = geometry.attributes.color.array;

    for (let i = 0; i < positions.length; i += 3) {
      const particleIndex = i / 3;

      const px = positions[i];
      const py = positions[i + 1];
      const pz = positions[i + 2];

      // Twinkle calculation
      const brightness = 0.5 + 0.5 * Math.sin(elapsed * twinkleSpeed[particleIndex] + twinklePhase[particleIndex]);

      // Update blue channel for twinkling
      colors[i + 2] = brightness; // Blue

      // Calculate distance from particle to interaction point
      const dx = px - intersectionPoint.x;
      const dy = py - intersectionPoint.y;
      const dz = pz - intersectionPoint.z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

      const minDistance = 50; // Increased threshold for better interaction
      if (distance < minDistance && distance > 0) {
        const force = (minDistance - distance) / minDistance;
        const nx = dx / distance;
        const ny = dy / distance;
        const nz = dz / distance;

        // Apply repulsion force to velocities
        velocities[i] += nx * force * 0.5; // Adjust force multiplier as needed
        velocities[i + 1] += ny * force * 0.5;
        velocities[i + 2] += nz * force * 0.5;
      }

      // **Add Random Velocity Perturbations**
      const randomFactor = 0.05; // Adjust the randomness strength
      velocities[i] += (Math.random() - 0.5) * randomFactor;
      velocities[i + 1] += (Math.random() - 0.5) * randomFactor;
      velocities[i + 2] += (Math.random() - 0.5) * randomFactor;

      // **Clamp Velocities to Prevent Excessive Speeds**
      const maxSpeed = 1.0; // Maximum speed per axis
      velocities[i] = THREE.MathUtils.clamp(velocities[i], -maxSpeed, maxSpeed);
      velocities[i + 1] = THREE.MathUtils.clamp(velocities[i + 1], -maxSpeed, maxSpeed);
      velocities[i + 2] = THREE.MathUtils.clamp(velocities[i + 2], -maxSpeed, maxSpeed);

      // Apply velocity to position
      positions[i] += velocities[i];
      positions[i + 1] += velocities[i + 1];
      positions[i + 2] += velocities[i + 2];

      // Add minimal damping for smoother motion
      velocities[i] *= 0.99; // Reduced damping
      velocities[i + 1] *= 0.99;
      velocities[i + 2] *= 0.99;

      // Boundary conditions to keep particles within the cuboid
      if (positions[i] > spread || positions[i] < -spread) velocities[i] *= -1;
      if (positions[i + 1] > spread || positions[i + 1] < -spread) velocities[i + 1] *= -1;
      if (positions[i + 2] > spread || positions[i + 2] < -spread) velocities[i + 2] *= -1;
    }

    // Flag attributes for update
    geometry.attributes.position.needsUpdate = true;
    geometry.attributes.velocity.needsUpdate = true;
    geometry.attributes.color.needsUpdate = true;
  });

  return null;
};

// Utility function to generate particles
const generateParticles = (count, spread) => {
  const positions = [];
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * spread * 2;
    const y = (Math.random() - 0.5) * spread * 2;
    const z = (Math.random() - 0.5) * spread * 2;
    positions.push(x, y, z);
  }
  return new Float32Array(positions);
};

// Main Particle System Component
const ThreeParticles = () => {
  // Parameters
  const particleCount = 3000; // Increased particle count
  const spread = 150; // Increased spread to accommodate more particles

  // Generate particle positions and velocities
  const particles = useMemo(() => generateParticles(particleCount, spread), [particleCount, spread]);
  const velocities = useMemo(() => {
    const vel = new Float32Array(particleCount * 3);
    for (let i = 0; i < vel.length; i += 3) {
      vel[i] = (Math.random() - 0.5) * 0.2; // Reduced initial velocity for smoother motion
      vel[i + 1] = (Math.random() - 0.5) * 0.2;
      vel[i + 2] = (Math.random() - 0.5) * 0.2;
    }
    return vel;
  }, [particleCount]);

  // Initialize twinkle speeds and phases
  const twinkleSpeed = useMemo(() => {
    const speeds = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      speeds[i] = Math.random() * 0.02 + 0.01; // Twinkle speed between 0.01 and 0.03
    }
    return speeds;
  }, [particleCount]);

  const twinklePhase = useMemo(() => {
    const phases = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      phases[i] = Math.random() * Math.PI * 2; // Random phase between 0 and 2π
    }
    return phases;
  }, [particleCount]);

  // Create bufferGeometry with position, velocity, and color attributes
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(particles, 3).setUsage(THREE.DynamicDrawUsage));
    geom.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3).setUsage(THREE.DynamicDrawUsage));

    // Initialize color attribute (blue color with full brightness)
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < colors.length; i += 3) {
      colors[i] = 0.0;     // Red
      colors[i + 1] = 0.0; // Green
      colors[i + 2] = 1.0; // Blue
    }
    geom.setAttribute('color', new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage));

    return geom;
  }, [particles, velocities, particleCount]);

  // Create circular texture
  const texture = useMemo(() => createCircularTexture(), []);

  return (
    <>
      {/* Orbit Controls with Zoom Disabled */}
      <OrbitControls enableZoom={false} />

      {/* Particles */}
      <points geometry={geometry}>
        {/* Points Material with circular texture and vertex colors */}
        <pointsMaterial
          color={0xffffff} // White base color to allow blue vertex colors to show correctly
          map={texture} // Apply circular texture
          size={3} // Adjusted size for better visibility with more particles
          sizeAttenuation
          transparent
          alphaTest={0.5} // Ensures proper transparency handling
          blending={THREE.AdditiveBlending} // Enhances visual appeal
          vertexColors // Enable vertex colors for twinkling
        />
      </points>

      {/* Particle Interaction and Twinkle Controller */}
      <ParticlesController
        geometry={geometry}
        spread={spread}
        twinkleSpeed={twinkleSpeed}
        twinklePhase={twinklePhase}
      />
    </>
  );
};

export default ThreeParticles;
