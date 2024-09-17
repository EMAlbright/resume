"use client"
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import Name from '../name/name';
import Instructions from '../instructions/instructions';
import CreateBubble from '../bubbleCreation/createBubble';
import CreateText from '../createText/createText';
import { Float } from '../../animations/updateBubbles';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import CreateLine from '../lineCreation/createLine';

var stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

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
  const bubblesRef = useRef<THREE.Mesh[]>([]);
  const scrollIndexRef = useRef<number>(0);

  const [activeSection, setActiveSection] = useState<string | null>(null);

  const loader = new GLTFLoader();

  const mouse = new THREE.Vector2();
  const rayCaster = new THREE.Raycaster();

  const params = {
    bloomStrength: 2,
    bloomThreshold: 0,
    bloomRadius: .25
  }

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

    // pass renderer to composer . scene and camera
    const composer = new EffectComposer(renderer);
    composerRef.current = composer;

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    // info panel for educaitno, experience, projects
    const infoPanel = createInfoPanel();
    scene.add(infoPanel);

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
        
        camera.position.set(-0.197375, 2.1954194, 7.199677);
        camera.lookAt(new THREE.Vector3(0, 0, 0));

        controls.update();

    }, undefined, function (error){
        console.error(error);
    });

    // mouse event listeneer
    const onMouseMove = (event: MouseEvent) => {
        // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;    
    };

    window.addEventListener('mousemove', onMouseMove, false);

    //add name 
    const nameMesh = Name();
    scene.add(nameMesh);

    //bubble for resume information
    const yellowBubble = CreateBubble(0xffd700, -.75, .65, .25);
    yellowBubble.name = "experience";
    const tealBubble = CreateBubble(0x0ff0ff, .5, .7, -.5);
    tealBubble.name = "projects";
    const pinkBubble = CreateBubble(0xdb4a8f, .8, .5, .65);
    pinkBubble.name = "education";
    bubblesRef.current.push(yellowBubble, tealBubble, pinkBubble);

    //text
    const experience = CreateText("Experience", 0xdb4a8f, .1, -.75, .65, .25);
    const education = CreateText("Education\n    Skills", 0x0ff0ff, .1, .8, .5, .65);
    const projects = CreateText("Projects", 0xffd700, .1, .5, .7, -.5);

    //lines
    const yellowLine = CreateLine(0xffd700, -.75, .65, .25);
    const tealLine = CreateLine(0x0ff0ff, .5, .7, -.5);
    const pinkLine = CreateLine(0xdb4a8f, .8, .5, .65);

    scene.add(pinkBubble);
    scene.add(education);
    scene.add(yellowBubble);
    scene.add(experience);
    scene.add(tealBubble);
    scene.add(projects);
    scene.add(yellowLine);
    scene.add(tealLine);
    scene.add(pinkLine);
    
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      rayCaster.setFromCamera(mouse, camera);

      const intersectBounds = rayCaster.intersectObjects(bubblesRef.current);
      bubblesRef.current.forEach(bubble => bubble.scale.set(1, 1, 1));

      if (intersectBounds.length > 0){
        const hoveredBubble = intersectBounds[0].object as THREE.Mesh;
        hoveredBubble.scale.set(1.1, 1.1, 1.1);
      }


      // float bubbles
      Float(elapsedTime, nameMesh, pinkBubble, education, yellowBubble, experience, tealBubble, projects, yellowLine, pinkLine, tealLine);
      
      composer.render();
      controls.update();
    };

    //animation for scene
    animate();
    stats.end()

    //cleanup initial
    return () => {
        (function(){var script=document.createElement('script');script.onload=function(){var stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()
        window.removeEventListener('mousemove', onMouseMove);
        mountRef.current?.removeChild(renderer.domElement);
      }
  }, []);
  // end of first useeffect

  // create a panel to display information of respected bubble
  const createInfoPanel = () => {
    // make plane
    const geometry = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
    const material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.9,
      
      side: THREE.DoubleSide,
    });
    // return plane and set it
    const panel = new THREE.Mesh(geometry, material);
    panel.position.set(0, 0, 2);
    panel.name = 'infoPanel';
    panel.visible = false;
    return panel;
  };

  const handleBubbleClick = (bubbleName: string) => {
    if(!sceneRef.current || !cameraRef.current) return;

    const infoPanel = sceneRef.current.getObjectByName('infoPanel') as THREE.Mesh;
    const existingContent = sceneRef.current?.getObjectByName('panelContent');
    const camera = cameraRef.current;

    console.log("info", infoPanel);
    if (!infoPanel) return;

    if (activeSection === bubbleName) {
      // Hide panel if clicking the same bubble
      infoPanel.visible = false;
      if (existingContent) sceneRef.current?.remove(existingContent);
      setActiveSection(null);
    } else {
      // Show panel with new content
      infoPanel.visible = true;
      updateInfoPanelContent(bubbleName);
      setActiveSection(bubbleName);
      const distanceFromPanel = .75; // Set how far the camera should be from the panel

      // Assuming the panel is at some fixed position, you can place the camera directly in front of it.
      const panelPosition = infoPanel.position;
      const panelNormal = new THREE.Vector3(0, 0, 1); // Assume the panel is facing the Z-axis direction
      const cameraPosition = panelPosition.clone().add(panelNormal.multiplyScalar(distanceFromPanel));
  
      // Move the camera to the calculated position
      camera.position.copy(cameraPosition);
  
      // Make the camera look at the center of the info panel
      camera.lookAt(panelPosition);
  
      // If using OrbitControls, update the controls
      //controlsRef.current?.update(); // Assuming you have OrbitControls
    }
  };

  const updateInfoPanelContent = (section: string) => {

    //description of section
    const sectionDetails = getSectionDetails(section);
    const lines = sectionDetails.split("\n");

    //remove existing content
    const existingContent = sceneRef.current?.getObjectByName('panelContent');
    if (existingContent) sceneRef.current?.remove(existingContent);

    // Create new content
    const content = new THREE.Group();
    content.name = 'panelContent';

    // Add text for the section
    const text = CreateText(section, 0xffffff, 0.1, 0, 0.6, 2);
    content.add(text);

    // Add more details based on the section
    const textMesh = CreateText(sectionDetails, 0xffffff, 0.05, 0, .4, 2);
    content.add(textMesh);
    

    sceneRef.current?.add(content);
  };

  const getSectionDetails = (section: string): string => {
    switch (section) {
      case 'experience':
        return 'Your work experience details...';
      case 'education':
        return 'Bachelor of Applied Science - Applied Computing\n Minor - Business Administration';
      case 'projects':
        return 'Your projects details...';
      default:
        return '';
    }
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!sceneRef.current || !cameraRef.current) return;

      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, cameraRef.current);

      const intersects = raycaster.intersectObjects(bubblesRef.current);
      if (intersects.length > 0) {
        handleBubbleClick(intersects[0].object.name);
        console.log(intersects[0].object.name);
      }
    };

    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();

      if (!sceneRef.current || !cameraRef.current) return;
  
      // Adjust scrollIndex based on deltaY
      if (event.deltaY > 0) {
        // Scroll down
        scrollIndexRef.current = Math.min(scrollIndexRef.current + 1, bubblesRef.current.length - 1);
      } else {
        // Scroll up
        scrollIndexRef.current = Math.max(scrollIndexRef.current - 1, 0);
      }
  
      const bubble = bubblesRef.current[scrollIndexRef.current];
      handleBubbleClick(bubble.name);
    }

    window.addEventListener('click', handleClick);
    //window.addEventListener('wheel', handleScroll);

    return () => {
      window.removeEventListener('click', handleClick);
    //  window.removeEventListener('wheel', handleScroll);
    };
  }, [activeSection]);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ThreeScene;