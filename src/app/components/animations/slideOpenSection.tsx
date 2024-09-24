import gsap from 'gsap'; 

export const slideOpenScreen = (sceneRef: any, panelName: string, sectionName: string) => {
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
        duration: .25,
        ease: "power2.inOut", 
        OnComplete: () =>{
          screenMesh.visible = true;
        }
      });
    }
  };