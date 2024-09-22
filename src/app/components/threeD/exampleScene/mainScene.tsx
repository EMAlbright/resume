"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import CreateBubble from '../bubbleCreation/createBubble';
import CreateText from '../createText/createText';
import { Float } from '../../animations/updateBubbles';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import CreateLine from '../lineCreation/createLine';
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import ExperiencePanel from '@/app/pages/experience/page';
import TWEEN from '@tweenjs/tween.js';
import gsap from 'gsap'; 

var stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom

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
  stats.begin()
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);
  const bubblesRef = useRef<THREE.Group[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const loader = new GLTFLoader();

  const params = {
    bloomStrength: 3,
    bloomThreshold: 0,
    bloomRadius: .25
  }

  const slideOpenScreen = () => {
    if (!sceneRef.current) return;
    const screenMesh = sceneRef.current.getObjectByName('screenMesh');
    if (screenMesh instanceof THREE.Mesh) {
      screenMesh.visible = true;
      screenMesh.scale.y = 0;
      gsap.to(screenMesh.scale, {
        y: 1, 
        duration: .25,
        ease: "power2.inOut"
      });
    }
  };
  
  const slideCloseScreen = () => {
    if (!sceneRef.current) return;
    const screenMesh = sceneRef.current.getObjectByName('screenMesh');
    if (screenMesh instanceof THREE.Mesh) {
      gsap.to(screenMesh.scale, {
        y: 0, 
        duration: .25,
        ease: "power2.inOut",
        onComplete: () => {
          screenMesh.visible = false;
        }
      });
    }
  };
  

  useEffect(() => {
    if (!mountRef.current) return;

    //create scene, camera , renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer();

    // set size to window h/l
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement);

    // add light
    const ambientLight = new THREE.AmbientLight(0x404040); 
    scene.add(ambientLight);

    const controls = new OrbitControls(camera, renderer.domElement);

    //restrict orbit controls
    // cant go below plane
    //controls.enableZoom = false;
    controls.maxDistance = 3;
    controls.minDistance = 1;
    controls.maxPolarAngle = Math.PI / 2; 
    // pass renderer to composer . scene and camera
    const composer = new EffectComposer(renderer);
    composerRef.current = composer;

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // info panel for educaitno, experience, projects

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
    loader.load('/models/scene.gltf', (gltf) => {
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
        
        camera.position.set(0, .5, 2);
        controls.update();

    }, undefined, function (error){
        console.error(error);
    });

    camera.lookAt(new THREE.Vector3(0, .5, 0));

      //bubble for resume information
    const yellowBubble = CreateBubble(0xA4D7E1, -.85, .7, .25, "Background");
    yellowBubble.name = "experience";
    const tealBubble = CreateBubble(0xA4D7E1, .4, .9, -.5, "Education");
    tealBubble.name = "education";
    const pinkBubble = CreateBubble(0xA4D7E1, .7, .7, .65, "Projects  ");
    pinkBubble.name = "projects";
    const purpleBubble = CreateBubble(0xA4D7E1, -.1, .8, .8, "About Me");
    purpleBubble.name = "about";
    //bubblesRef.current.push(yellowBubble, tealBubble, pinkBubble, purpleBubble);
    scene.add(yellowBubble);
    scene.add(pinkBubble);
    scene.add(tealBubble);
    scene.add(purpleBubble);

    bubblesRef.current.push(yellowBubble, tealBubble, pinkBubble, purpleBubble);

    const screenGeometry = new THREE.PlaneGeometry(1, .5);
    const screenMaterial = new THREE.MeshBasicMaterial({ color: 0xE6F7FA, side: THREE.DoubleSide, transparent:true, opacity:0.075 });
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    // set the name so it cant be referenced to close and open functions
    screenMesh.name = 'screenMesh';
    
    screenMesh.position.set(camera.position.x-.5, camera.position.y+.5, camera.position.z+.5); 
    screenMesh.visible = false; 
    scene.add(screenMesh);

    const updateBubbleRotation = () => {
      if (!cameraRef.current) return;
    
      [yellowBubble, tealBubble, pinkBubble, purpleBubble].forEach((bubbleGroup) => {
        const cameraPosition = cameraRef.current!.position.clone();
        
        // Calculate the direction from the bubble to the camera
        const direction = new THREE.Vector3().subVectors(cameraPosition, bubbleGroup.position);
        
        // Project the direction onto the XZ plane
        direction.y = 0;
        direction.normalize();
    
        // Calculate the angle between the direction and the negative Z-axis
        const angle = Math.atan2(direction.x, direction.z);
    
        // Apply rotation to the entire bubble group
        bubbleGroup.rotation.y = angle;
      });
    };

    // mouse event listeneer
    const onMouseMove = (event: MouseEvent) => {
      if (!sceneRef.current || !cameraRef.current) return;

      const mouse = new THREE.Vector2();
        // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1; 

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);

      const intersects = raycaster.intersectObjects(bubblesRef.current);
      if (intersects.length > 0) {
      }
    };

    const onClick = (event: MouseEvent) => {
      if (!sceneRef.current || !cameraRef.current) return;
    
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);
    
      const intersects = raycaster.intersectObjects(bubblesRef.current, true);
      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        if (intersectedObject instanceof THREE.Mesh) {
        // Check if the intersected object is the parallelogram mesh
        if (intersectedObject.name === "bubbleParallelogram" && 
            intersectedObject.material instanceof THREE.MeshPhysicalMaterial) {
          
          const bubbleGroup = intersectedObject.parent;
          if (bubbleGroup) {
            console.log('Parallelogram clicked in bubble:', bubbleGroup.name);
            
            setIsOpen((prevIsOpen) => {
              if (!prevIsOpen) {
                slideOpenScreen();
                console.log('Opening');
                return true;
              } else {
                slideCloseScreen();
                console.log('Closing');
                return false;
              }
            });
              setActiveSection(bubbleGroup.name);
          }
        }
      }
    }
    };

    window.addEventListener('click', onClick);
    window.addEventListener('mousemove', onMouseMove);
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      updateBubbleRotation();

      // float bubbles
      Float(elapsedTime, purpleBubble, pinkBubble, yellowBubble,tealBubble);
      composer.render();
      controls.update();
    };

    //animation for scene
    animate();

    //cleanup initial
    return () => {
        (function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('click', onClick);
        mountRef.current?.removeChild(renderer.domElement);
      }
  }, []);
  

  stats.end();

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ThreeScene;