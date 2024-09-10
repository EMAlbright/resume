"use client"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const loader = new GLTFLoader();

  const params = {
    threshold: 0,
    strength: 1,
    radius: 0,
    exposure: 1
  }

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    camera.position.set(0, 0, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    
    const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
    bloomPass.threshold = params.threshold;
    bloomPass.strength = params.strength;
    bloomPass.radius = params.radius;

    // add space
    loader.load('/models/scene.gltf', function(gltf){
        const model = gltf.scene;

        // Calculate the model's bounding box
        const boundingBox = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        boundingBox.getSize(size);
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        
        // Center the model in the scene
        model.position.sub(center);
        scene.add(model);

        model.traverse((child) => {

            if (child instanceof THREE.Points){

                const positions = child.geometry.attributes.position;
                
                const particleDistances = [];
                for(let i = 0; i < positions.count; i++){
                    let x = positions.getX(i);
                    let y = positions.getY(i);
                    let z = positions.getZ(i);
                    
                    let distance = Math.sqrt(
                        Math.pow(x-center.x, 2) + Math.pow(y-center.y, 2) + Math.pow(z-center.z, 2)
                    );

                    particleDistances.push({distance, index: i});
                }

                particleDistances.sort((a, b) => a.distance-b.distance);
                console.log(particleDistances);

                const maxDistance = particleDistances[particleDistances.length - 1].distance;

                //color of all particles
                const colors = child.geometry.attributes.color;

                particleDistances.forEach((particle) => {
                    const normalizedDistance = particle.distance / maxDistance; // value between 0 and 1

                    // Set color gradient (red/orange to blue)
                    const r = 1 - normalizedDistance; 
                    const g = Math.max(0.5, 1 - normalizedDistance); 
                    const b = normalizedDistance; 
        
                    colors.setXYZ(particle.index, r, g, b);
                });
            //   particleMaterial.color.set(0xff0000);
            }
        });
        
  
        // Adjust camera position and zoom
        const maxDimension = Math.max(size.x, size.y, size.z);
        camera.position.set(center.x/3, center.y/3, maxDimension/3); 
        camera.lookAt(center);
  
        // controls interact
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update();
    } , undefined, function (error){
        console.error(error);
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();
    return () => {

      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} ></div>;
};

export default  ThreeScene;