import * as THREE from 'three';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { useEffect, useRef } from 'react';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

const Name = () => {
    const group = new THREE.Group();
    const font = new FontLoader();
        
    font.load('/fonts/GeistVF.woff', (fontText) => {
        const textGeometry = new TextGeometry('Ethan Albright', {
            font: fontText,
            size: 10,
            height: 2
        });

        // material and textyre
        const textMaterial = new THREE.MeshPhongMaterial({color: 0xff0000});
        const textTexture = new THREE.Mesh(textGeometry, textMaterial);
        group.add(textTexture);
        });
    
    return group;
};

export default Name;