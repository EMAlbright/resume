import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const CreateBubble = (color: any, x: number, y: number, z: number, text: string) => {
    // Create bubble geometry (parallelogram shape)
    const vertices = new Float32Array([
        // First triangle (A-B-C)
        0, 0, 0,
        0.4, 0, 0,
        0.2, 0.2, 0,

        // Second triangle (A-C-D)
        0, 0, 0,
        0.2, 0.2, 0,
        -0.2, 0.2, 0,
    ]);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();

    // Create materials
    const parallelogramMaterial = new THREE.MeshPhysicalMaterial({
        color: color,
        transparent: true,
        opacity: 0.8,
        emissive: color,
        emissiveIntensity: 0.15,
        side: THREE.DoubleSide,
    });

    // Create the parallelogram mesh
    const parallelogram = new THREE.Mesh(geometry, parallelogramMaterial);
    parallelogram.position.x -= .15;
    // Create a text mesh
    const fontLoader = new FontLoader();
    fontLoader.load('/fonts/OxaniumMedium_Regular.json', (font) => {
        const textGeometry = new TextGeometry(text, {
            font: font,
            size: 0.04, 
            height: 0.01, 
            curveSegments: 12,
            bevelEnabled: false,
        });

        const textMaterial = new THREE.MeshBasicMaterial({ color: 'black' });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Center the text
        const textBox = new THREE.Box3().setFromObject(textMesh);
        const textCenter = new THREE.Vector3();
        textBox.getCenter(textCenter);
        textMesh.position.sub(textCenter); // Move to center
        textMesh.position.y += 0.1;
        textMesh.position.x -= 0.05;
        // Add text mesh to the group
        bubbleGroup.add(textMesh);
    });

    // Create line
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0, 0, -0.5, 0]), 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({ color: color });
    const line = new THREE.Line(lineGeometry, lineMaterial);
    // Create a group to hold the parallelogram, text, and line
    const bubbleGroup = new THREE.Group();
    bubbleGroup.add(parallelogram);
    bubbleGroup.add(line);
    bubbleGroup.position.set(x, y, z);

    return bubbleGroup;
}

export default CreateBubble;
