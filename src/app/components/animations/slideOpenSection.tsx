import gsap from 'gsap'; 
import * as THREE from 'three';

export const slideOpenScreen = (sceneRef: React.MutableRefObject<THREE.Scene | null>, panelName: string, sectionName: string) => {
    if (!sceneRef.current) return;
    const screenMesh = sceneRef.current.getObjectByName(panelName);
    const button = sceneRef.current.getObjectByName(sectionName);
    if(!button) return;
    button.visible = false;
    if (screenMesh){
      screenMesh.scale.y = 0;
      gsap.to(screenMesh.scale, {
        y: .002, 
        x: .002,
        duration: .5,
        ease: "power2.inOut", 
        OnComplete: () =>{
          screenMesh.visible = true;
        }
      });
    }
  };