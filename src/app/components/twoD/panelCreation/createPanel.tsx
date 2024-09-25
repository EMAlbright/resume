import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import gsap from 'gsap'; 

export const CreateDescriptionPanel = (scene: any, button: any, descriptionText: any, x: number, y: number, z: number) => {
    // Create panel container
    const panel = document.createElement('div');
    panel.style.width = '750px';
    panel.style.height = '500px';
    panel.style.backgroundColor = '#A4D7E1';
    panel.style.border = '5px solid #000';
    panel.style.borderRadius = '10px';
    panel.style.boxShadow = '0px 4px 12px rgba(0, 0, 0, 0.1)';
    panel.style.position = 'relative'; 
    panel.style.padding = '20px';
    panel.style.fontSize = '20px';
    panel.style.color = '#333';
    panel.style.pointerEvents = 'auto';
    panel.style.opacity = '0.95';

    panel.appendChild(descriptionText);

    // Create close (X) button
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.width = '40px';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '0px';
    closeButton.style.left = '0px';
    closeButton.style.background = 'transparent';
    closeButton.style.border = 'none';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#000';
    closeButton.style.fontFamily = 'Arial, sans-serif';
    closeButton.style.transition = 'background-color 0.3s';

    closeButton.onmouseenter = () => {
        closeButton.style.backgroundColor = '#c00';
        closeButton.style.color = '#FFFFFF';
    };
    closeButton.onmouseleave = () => {
        closeButton.style.backgroundColor = '#A4D7E1';
        closeButton.style.color = '#000';
    };

    // set visibility to false
    closeButton.onclick = () => {
        gsap.to(panelObject.scale, {
            y: 0,
            x: 0, 
            duration: .25,
            ease: "power2.inOut",
            onComplete: () => {
                closeButton.style.backgroundColor = '#A4D7E1';
                closeButton.style.color = '#000';
                panelObject.visible = false;
                scene.remove(panelObject);
                button.visible = true;
            }
          });
    };

    panel.appendChild(closeButton);

    // Create CSS3DObject for the panel
    const panelObject = new CSS3DObject(panel);
    panelObject.position.set(x, y, z);
    panelObject.scale.set(0.00025, 0.00025, 0.00025);  

    return panelObject;
}
