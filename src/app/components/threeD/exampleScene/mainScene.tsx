"use client"
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import Name from '../name/name';
import Instructions from '../instructions/instructions';
import CreateBubble from '../experience/experience';
// create texture circle
const createCircleTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);
    }
    return new THREE.CanvasTexture(canvas);
  }

const ThreeScene: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const loader = new GLTFLoader();

  const params = {
    bloomStrength: 5,
    bloomThreshold: 0,
    bloomRadius: .25
  }

  useEffect(() => {
    if (!mountRef.current) return;

    //create scene, camera , renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();

    // set size to window h/l
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // add light
    const ambientLight = new THREE.AmbientLight(0x404040); 
    scene.add(ambientLight);

    

    // pass renderer to composer . scene and camera
    const composer = new EffectComposer(renderer);
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // add glow / star effect with UnrealBloomPass
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      params.bloomStrength,
      params.bloomRadius,
      params.bloomThreshold
    );
    // add to composer
    composer.addPass(bloomPass);

    // load in particle model
    loader.load('/models/scene.gltf', function(gltf){
        const model = gltf.scene;
        // get center and size of model
        const boundingBox = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        boundingBox.getSize(size);
        const center = new THREE.Vector3();
        boundingBox.getCenter(center);
        // add model to scene
        model.position.sub(center);
        scene.add(model);

        let maxDistance = 0;

        // make new sphere texture
        const particleTexture = createCircleTexture();

        // go through each particle and get their position / distance from the center
        // apply color to particle based on distance from the center
        model.traverse((child) => {
            if (child instanceof THREE.Points){
                const positions = child.geometry.attributes.position;
                const colors = new Float32Array(positions.count * 3);

                for(let i = 0; i < positions.count; i++){
                    const x = positions.getX(i);
                    const y = positions.getY(i);
                    const z = positions.getZ(i);
                    
                    const distance = Math.sqrt(x*x + y*y + z*z);
                    maxDistance = Math.max(maxDistance, distance);
                }

                for(let i = 0; i < positions.count; i++){
                    const x = positions.getX(i);
                    const y = positions.getY(i);
                    const z = positions.getZ(i);
                    
                    const distance = Math.sqrt(x*x + y*y + z*z);
                    const normalizedDistance = distance / maxDistance;

                    // Color gradient: outer (blue) to inner (red)
                    const r = Math.max(0, Math.min(1, 1 - normalizedDistance));
                    const g = Math.max(0, Math.min(1, 0.5 - Math.abs(normalizedDistance - 0.5)));
                    const b = Math.max(0, Math.min(1, normalizedDistance));

                    colors[i * 3] = r;
                    colors[i * 3 + 1] = g;
                    colors[i * 3 + 2] = b;
                }

                child.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

                const particleMaterial = new THREE.PointsMaterial({
                    size: .0025,
                    // use the circle particle texutre on new material
                    map: particleTexture,
                    vertexColors: true,
                    blending: THREE.AdditiveBlending,
                    transparent: true,
                    depthWrite: false
                });
                // add new particles to scene and remove old particles
                child.material = particleMaterial;

            }
        });
        
        camera.position.set(-0.197375, 2.1954194, 7.199677);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update();

    }, undefined, function (error){
        console.error(error);
    });

    //add name 
    const nameMesh = Name();
    scene.add(nameMesh);

    //add asteroids for instructions
    const asteroids = Instructions();
    scene.add(asteroids);

    //bubble for resume information
    const yellowBubble = CreateBubble(0xffd700, -.75, .65, .25);
    const tealBubble = CreateBubble(0x0ff0ff, .5, .7, -.5);
    const pinkBubble = CreateBubble(0xdb4a8f, .8, .5, .65);


    scene.add(pinkBubble);
    scene.add(yellowBubble);
    scene.add(tealBubble);
    
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      // name float
      nameMesh.position.y = 3 + Math.sin(elapsedTime) * 0.1;
      
      // float bubbles
      yellowBubble.position.y = .75 + Math.sin(elapsedTime) * 0.07;
      tealBubble.position.y = .75 + Math.sin(elapsedTime+1) * 0.04;
      pinkBubble.position.y = .75 + Math.sin(elapsedTime+2) * 0.04;

      asteroids.rotateY(.001);
      composer.render();
    };

    animate();

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ThreeScene;