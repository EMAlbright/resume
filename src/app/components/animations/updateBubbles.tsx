import * as THREE from 'three';
export const Float = (
    elapsedTime: number,
    purpleBubble: THREE.Object3D,
    about: THREE.Object3D,
    pinkBubble: THREE.Object3D,
    education: THREE.Object3D,
    yellowBubble: THREE.Object3D,
    experience: THREE.Object3D,
    tealBubble: THREE.Object3D,
    projects: THREE.Object3D,
    yellowLine: THREE.Object3D,
    pinkLine: THREE.Object3D,
    tealLine: THREE.Object3D,
    purpleLine: THREE.Object3D
) => {

    pinkBubble.position.y = .65 + Math.sin(elapsedTime+2) * 0.04;
    pinkLine.position.y = .15 + Math.sin(elapsedTime+2) * 0.04;
    education.position.y = .25 + Math.sin(elapsedTime+2) * 0.04;

    purpleBubble.position.y = .65 + Math.sin(elapsedTime) * 0.07;
    purpleLine.position.y = Math.sin(elapsedTime) * 0.07;
    about.position.y =  .1 + Math.sin(elapsedTime) * 0.07;

    yellowBubble.position.y = .65 + Math.sin(elapsedTime) * 0.07;
    yellowLine.position.y = Math.sin(elapsedTime) * 0.07;
    experience.position.y =  .1 + Math.sin(elapsedTime) * 0.07;

    tealBubble.position.y = .65 + Math.sin(elapsedTime+1) * 0.04;
    tealLine.position.y = -.05 + Math.sin(elapsedTime+1) * 0.04;
    projects.position.y = .05 + Math.sin(elapsedTime+1) * 0.04;
}