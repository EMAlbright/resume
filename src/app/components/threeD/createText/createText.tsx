import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
const CreateText = (text: string, color: any, intensity: number, x: number, y: number, z:number) => {
    const group = new THREE.Group();

    const font = new FontLoader();

     font.load('/fonts/optimer_regular.typeface.json', (fontText) => {
        const textGeometry = new TextGeometry(text, {
            font: fontText,
            size: .03,
            height: .001,
        });
 
        // material and textyre
        const textMaterial = new THREE.MeshPhongMaterial({
            color: color,
            emissive: color,
            emissiveIntensity: intensity
        });        
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        
        textMesh.position.set(x, y, z);

        // center text
        textGeometry.center();
        
        group.add(textMesh);
    });
    return group;
}

export default CreateText;