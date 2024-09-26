import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'; // Make sure to include this

export const CreateButton = (button: HTMLButtonElement, x: number, y: number, z: number) => {

    // Create CSS3DObject for the button
    const buttonObject = new CSS3DObject(button);
    buttonObject.position.set(x, y, z);
    buttonObject.scale.set(0.0005, 0.0005, 0.0005);

    return buttonObject;
}
