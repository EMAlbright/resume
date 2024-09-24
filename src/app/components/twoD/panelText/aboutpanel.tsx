export const CreateAboutText = () => {
        const textContainer = document.createElement('div');
    
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Oxanium:wght@500&display=swap';
        document.head.appendChild(fontLink);
    
        // Apply custom font to the button
        textContainer.style.fontFamily = '"Oxanium", sans-serif';
    
        // Style for the description container
        textContainer.style.width = '100%';
        textContainer.style.height = '100%';
        textContainer.style.padding = '10px';
        textContainer.style.boxSizing = 'border-box';
        textContainer.style.lineHeight = '1.6';
        textContainer.style.overflowY = 'auto'; 
    
        textContainer.style.scrollbarWidth = 'thin';
        textContainer.style.scrollbarColor = 'black transparent'; 
    
        const scrollbarStyles = document.createElement('style');
        scrollbarStyles.innerHTML = `
            /* Webkit Browsers (Chrome, Safari) */
            div::-webkit-scrollbar {
                width: 10px;
            }
    
            div::-webkit-scrollbar-thumb {
                background-color: black;
                border-radius: 100px;
            }
    
            div::-webkit-scrollbar-track {
                background: transparent;
            }
        `;
        document.head.appendChild(scrollbarStyles);
    
        const me = document.createElement('div');
        me.style.marginBottom = '20px';
        const universityTitle = document.createElement('h3');
        me.innerHTML  = `
        <strong>Hi there! My name is Ethan Albright</strong><br>
    `;
        me.style.margin = '0';
        me.style.textAlign = 'center';
        me.style.fontSize = '28px';
        me.style.color = 'black';
    
        const hometown = document.createElement('p');
        hometown.innerHTML = `
            <strong>Based out of Seattle, WA</strong><br>
        `;
        hometown.style.margin = '5px 0';
        hometown.style.fontSize = '20px';
        hometown.style.textAlign = 'center';
        hometown.style.color = '#667';
    
        me.appendChild(universityTitle);
        me.appendChild(hometown);
        textContainer.appendChild(me);
    
        return textContainer;
};
