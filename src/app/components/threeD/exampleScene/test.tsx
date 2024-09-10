"use client"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const loader = new GLTFLoader();

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    camera.position.set(0, 0, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

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
            const closeBoundingBox = new THREE.Box3().setFromObject(model);
            const farBoundingBox = new THREE.Box3().setFromObject(model);
            if (child instanceof THREE.Points){
                const particleMaterial = child.material as THREE.PointsMaterial;

                particleMaterial.color.set(0xff0000);
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