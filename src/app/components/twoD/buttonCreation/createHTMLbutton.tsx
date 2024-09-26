"use client"
export const CreateHTMLbutton = (text: string) => {
    const button = document.createElement('button');
    button.textContent = text;
    button.style.width = '750px';
    button.style.height = '350px';
    button.style.padding = '10px';
    button.style.backgroundColor = '#A4D7E1';
    button.style.color = 'black';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.pointerEvents = 'auto';
    button.style.opacity = '0.75';
    button.style.fontSize = '100px';
    button.style.clipPath = 'polygon(25% 0, 100% 0, 75% 100%, 0 100%)';

    // Add custom font
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Oxanium:wght@500&display=swap';
    document.head.appendChild(fontLink);

    // Apply custom font to the button
    button.style.fontFamily = '"Oxanium", sans-serif';
    return button
}