import * as THREE from 'three';
import { Group } from 'three/examples/jsm/libs/tween.module.js';

const CreateLine = (lineColor: any, x: number, y:number, z:number) => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([x, y, z, x, y-.5, z]), 3));
    
    // Create line material
    const material = new THREE.LineBasicMaterial({ color: lineColor }); // Red color
    
    // Create line object
    const line = new THREE.Line(geometry, material);
    return line;
}

export default CreateLine;