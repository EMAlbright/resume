// animations.js
import * as THREE from 'three';

// Function to animate the group
export const animateHover = (group) => {
  const clock = new THREE.Clock();
  
  const animate = () => {
    requestAnimationFrame(animate);
    
    const elapsedTime = clock.getElapsedTime();
    const hoverHeight = Math.sin(elapsedTime) * 0.5; // Adjust amplitude and speed here
    
    if (group) {
      group.position.y = 3 + hoverHeight; // Adjust initial Y position and hover range
    }
  };

  animate();
};
