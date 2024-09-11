import * as THREE from 'three';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { useEffect, useRef } from 'react';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const Name = () => {
    const group = new THREE.Group();
    const font = new FontLoader();
    //for floating
    const clock = new THREE.Clock()
    font.load('/fonts/gentilis_bold.typeface.json', (fontText) => {
        const textGeometry = new TextGeometry('   Ethan Albright\nSoftware Engineer', {
            font: fontText,
            size: .25,
            height: .001
        });

        // material and textyre
        const textMaterial = new THREE.MeshPhongMaterial({color: 0xffffff});
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        
        textMesh.position.set(0, 0, 2);
        textMesh.rotation.set(.25, 0, 0);

        // center text
        textGeometry.center();
        
        group.add(textMesh);
        });
    
    return group;
};

export default Name;