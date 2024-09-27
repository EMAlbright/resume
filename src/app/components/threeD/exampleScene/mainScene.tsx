"use client"
import React, { useState, useEffect, useRef} from 'react';
import SidePanel from '../../twoD/sidePanel/sidePanel';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { Float } from '../../animations/updateBubbles';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { CSS3DRenderer} from 'three/addons/renderers/CSS3DRenderer.js';
import { CreateButton } from '../../twoD/buttonCreation/createButton';
import { CreateHTMLbutton } from '../../twoD/buttonCreation/createHTMLbutton';
import { CreateAboutText, CreateEducationText, CreateProjectText, CreateExperienceText } from '../../twoD/panelContent/panelContent';

const stats = new Stats();
stats.showPanel( 1 ); // 0: fps, 1: ms, 2: mb, 3+: custom

// create texture circle
const createCircleTexture = () => {
  if(!document) return;
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
  const [openPanel, setOpenPanel] = useState<string | null>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const composerRef = useRef<EffectComposer | null>(null);

  const loader = new GLTFLoader();
  // css renderer
  const css3dRendererRef = useRef<CSS3DRenderer | null>(null);

  const params = {
    bloomStrength: 3,
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

    // css 3d renderer setup
    const css3dRenderer = new CSS3DRenderer();
    css3dRenderer.setSize(window.innerWidth, window.innerHeight);
    css3dRenderer.domElement.style.position = 'absolute';
    css3dRenderer.domElement.style.top = '0';
    css3dRenderer.domElement.style.pointerEvents = 'none';
    mountRef.current.appendChild(css3dRenderer.domElement);
    css3dRendererRef.current = css3dRenderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    // reduce camera quick movements
    controls.enableDamping = true;  
    controls.dampingFactor = 0.1;

    //restrict orbit controls
    // cant go below plane
    //controls.enableZoom = false;
    controls.maxDistance = 2.25;
    controls.minDistance = 1.5;
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

    // initial cameras scene setup
    camera.lookAt(new THREE.Vector3(0, 1.5, 0));

    // create 2d button with css renderer
    const abouthtmlButton = CreateHTMLbutton("About Me");
    const aboutButton = CreateButton(abouthtmlButton, -.1, .7, .8);
    aboutButton.name = 'aboutSection';
    scene.add(aboutButton);

    const experiencehtmlButton = CreateHTMLbutton("Experience");
    const experienceButton = CreateButton(experiencehtmlButton, -.85, .7, .25);
    experienceButton.name = 'experienceSection';
    scene.add(experienceButton);

    const projectshtmlButton = CreateHTMLbutton("Projects");
    const projectsButton = CreateButton(projectshtmlButton, .7, .7, .65);
    projectsButton.name = 'projectSection';
    scene.add(projectsButton);

    const educationhtmlButton = CreateHTMLbutton("Education");
    const educationButton = CreateButton(educationhtmlButton, .4, .7, -.5);
    educationButton.name = 'educationSection';
    scene.add(educationButton);



    const updateSectionRotation = () => {
      if (!cameraRef.current) return;
    
      [aboutButton, experienceButton, projectsButton, educationButton].forEach((bubbleGroup) => {
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

    // event listener for button
    abouthtmlButton.addEventListener('click', () => {
      setOpenPanel('about');
    });

    experiencehtmlButton.addEventListener('click', () => {
      setOpenPanel('experience');
    });

    projectshtmlButton.addEventListener('click', () => {
      setOpenPanel('projects');
    });

    educationhtmlButton.addEventListener('click', () => {
      setOpenPanel('education');
    });

    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      updateSectionRotation();

      // float bubbles
      Float(elapsedTime, aboutButton, projectsButton, experienceButton, educationButton);
      composer.render();
      controls.update();
      css3dRenderer.render(scene, camera);
    };

    //animation for scene
    animate();

    //cleanup initial
    return () => {
        (function(){const script=document.createElement('script');script.onload=function(){const stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='https://mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})();
        mountRef.current?.removeChild(renderer.domElement);
        mountRef.current?.removeChild(css3dRenderer.domElement);
      }
  }, []);

  const closePanel = () => {
    setOpenPanel(null);
    if (sceneRef.current) {
      ['aboutSection', 'experienceSection', 'projectSection', 'educationSection'].forEach(sectionName => {
        const button = sceneRef.current!.getObjectByName(sectionName);
        if (button) button.visible = true;
      });
    }
  };

  const getPanelContent = (panelName: string) => {
    switch (panelName) {
      case 'about':
        return CreateAboutText();
      case 'experience':
        return CreateExperienceText();
      case 'projects':
        return CreateProjectText();
      case 'education':
        return CreateEducationText();
      default:
        return null;
    }
  };
  

  stats.end();

  return (
    <>
      <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />
      <SidePanel
        isOpen={openPanel !== null}
        onClose={closePanel}
        content={openPanel ? getPanelContent(openPanel) : null}
        currentSection={openPanel}
      />
    </>
  );
};

export default ThreeScene;