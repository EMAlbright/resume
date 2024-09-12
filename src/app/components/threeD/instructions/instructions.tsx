import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import createTextTexture from '../../animations/textTexture';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';

const Instructions = () => {
    const group = new THREE.Group();
    const loader = new GLTFLoader();
    const fontLoader = new FontLoader();


    loader.load('/models/wandering_asteroids_of_milkyway.glb', function(gltf: any){
        const asteroids = gltf.scene;
        const textTexture = createTextTexture("Click and drag to look around\n Scroll to zoom in and out", "#000000", "25px Arial", 425, 475);
        
        asteroids.traverse((child: any) => {
            if (child.isMesh) {
                
                // create new
                console.log(child);
                child.material = new THREE.MeshStandardMaterial({
                    map: textTexture
                });
            }
            child.scale.set(.7, .7, .7);
            child.position.set(-.25, .8, 1.75);
        });
        
        group.add(asteroids);
    })

    // add instrucitons to asteroid with texture
/**    fontLoader.load('/fonts/gentilis_bold.typeface.json', function (fontText) {
        const textGeometry = new TextGeometry('click and drag to look aroun\n Scroll to zoom in and out', {
            font: fontText,
            size:.05, 
            depth: 0.01,  
        });

        // create mat and mesh
        const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);

        // Position the text above the asteroid
        textMesh.position.set(-3, 2.75, 4.25);
        group.add(textMesh); 
    });
   **/
    return group;
   
}

export default Instructions;
