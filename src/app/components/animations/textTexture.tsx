import * as THREE from 'three';

// function  to take in text and make it a texture (using map)
// on a specified
export default function createTextTexture(text: string, color: string, font: string, x: number, y: number) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if(context){
        // Set canvas size
        canvas.width = 1024;
        canvas.height = 1024;

        context.fillStyle = '#808080'; // Grey color
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Text settings
        context.font = `bold ${font}`;
        context.fillStyle = color;  
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        const lines = text.split('\n');
        const lineHeight = parseInt(font, 10) * 1.2; // Adjust as needed

        // Draw each line of text
        lines.forEach((line, index) => {
            context.fillText(line, x, y + index * lineHeight);
        });
    }
    
    return new THREE.CanvasTexture(canvas);
}