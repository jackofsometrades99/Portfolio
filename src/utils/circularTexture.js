// src/utils/circularTexture.js
import * as THREE from 'three';

export const createCircularTexture = () => {
  const size = 64; // Texture size
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  
  const context = canvas.getContext('2d');

  // Draw a circle
  context.beginPath();
  context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2, false);
  context.closePath();

  // Create a gradient for a smooth edge
  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2
  );
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.4, 'rgba(200, 200, 200, 0.6)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  context.fillStyle = gradient;
  context.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
};
