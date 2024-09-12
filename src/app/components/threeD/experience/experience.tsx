import * as THREE from 'three';
import { Group } from 'three/examples/jsm/libs/tween.module.js';

const CreateBubble = (color: any, x: number, y:number, z:number) => {
    const group = new Group();

    const geometry = new THREE.SphereGeometry(.1, 32, 32);

    const sphereMaterial = new THREE.MeshPhysicalMaterial({
        color: color, 
        transparent: true, 
        opacity: 0.5,
        emissive: color,
        emissiveIntensity: .1, 
        roughness: 0.1, 
        metalness: 0,
    })

    const sphere = new THREE.Mesh(geometry, sphereMaterial);
    sphere.position.set(x, y, z);
    return sphere;
}

export default CreateBubble;