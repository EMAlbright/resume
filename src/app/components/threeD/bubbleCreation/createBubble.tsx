import * as THREE from 'three';

const CreateBubble = (color: any, x: number, y:number, z:number) => {

    const vertices = new Float32Array([
        // First triangle (A-B-C)
        0, 0, 0,  
        .4, 0, 0,  
        .2, .2, 0,  
    
        // Second triangle (A-C-D)
        0, 0, 0,  
        .2, .2, 0,  
        -.2, .2, 0 
    ]);

    //const geometry = new THREE.BufferGeometry();
    //geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    //const geometry = new THREE.PlaneGeometry(0.4, 0.4);
    
    const geometry = new THREE.BoxGeometry(.2, .1, .1);

    const parallelogramMaterial = new THREE.MeshPhysicalMaterial({
        color: color, 
        transparent: true, 
        opacity: .2,
        emissive: color,
        emissiveIntensity: .1, 
        side: THREE.DoubleSide
    });
    geometry.computeVertexNormals();

    const parallelogram = new THREE.Mesh(geometry, parallelogramMaterial);
    parallelogram.position.set(x, y, z); 

    return parallelogram;
}

export default CreateBubble;