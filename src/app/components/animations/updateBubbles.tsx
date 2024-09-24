import * as THREE from 'three';
export const Float = (
    elapsedTime: number,
    purpleBubble: THREE.Object3D,
    pinkBubble: THREE.Object3D,
    yellowBubble: THREE.Object3D,
    tealBubble: THREE.Object3D
) => {
    purpleBubble.position.y = .65 + Math.sin(elapsedTime) * 0.07;
    pinkBubble.position.y = .65 + Math.sin(elapsedTime+2) * 0.04;
    yellowBubble.position.y = .65 + Math.sin(elapsedTime) * 0.07;
    tealBubble.position.y = .65 + Math.sin(elapsedTime+1) * 0.04;
}