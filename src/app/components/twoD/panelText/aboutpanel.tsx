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
        me.style.margin = '0';
        me.style.textAlign = 'center';
        me.style.fontSize = '28px';
        me.style.color = 'black';

        me.innerHTML  = `
        <strong>Hi there! My name is Ethan Albright</strong><br>
        `;

        const openTo = document.createElement('p');
        openTo.style.fontSize = '18px';
        openTo.innerHTML = `
        <strong>Open to all work in software development </strong>
        `
        
        const hometown = document.createElement('p');
        hometown.style.margin = '5px 0';
        hometown.style.fontSize = '18px';
        hometown.style.textAlign = 'center';
        hometown.style.color = '#0073e6';
        hometown.innerHTML = `
            <strong>Based out of Seattle, WA</strong><br>
        `;

        const languageTitle = document.createElement('p');
        languageTitle.style.fontSize = '20px';
        languageTitle.style.marginBottom = '20px';
        languageTitle.innerHTML = `
        <strong>Programming & Tools:</strong><br>
        `;

        const languages = document.createElement('p');
        languages.style.marginBottom = '20px';
        languages.style.fontSize = '20px';
        languages.style.color = '#0073e6';
        languages.innerHTML = `
        <ul style="display: grid; grid-template-columns: repeat(3, 1fr); list-style: none; padding: 0;">
        <li style="font-weight: bold; margin: 5px;">Python</li>
        <li style="font-weight: bold; margin: 5px;">Typescript</li>
        <li style="font-weight: bold; margin: 5px;">Javascript</li>
        <li style="font-weight: bold; margin: 5px;">Java</li>
        <li style="font-weight: bold; margin: 5px;">SQL</li>
        <li style="font-weight: bold; margin: 5px;">Rust</li>
        <li style="font-weight: bold; margin: 5px;">Flask</li>
        <li style="font-weight: bold; margin: 5px;">React & Next.js</li>
        <li style="font-weight: bold; margin: 5px;">PostgreSQL</li>
        <li style="font-weight: bold; margin: 5px;">MongoDB</li>
        <li style="font-weight: bold; margin: 5px;">AWS</li>
        <li style="font-weight: bold; margin: 5px;">RESTful APIs</li>
        </ul>
         `;

        const contact = document.createElement('p');
        contact.style.marginBottom = '20px';
        contact.style.fontSize = '18px';
        contact.innerHTML = `
        Feel free to contact me at <span style="font-weight: bold;">EthanMacAlbright@gmail.com</span>
        `;

        const socials = document.createElement('p');
        socials.style.marginBottom = '20px';
        socials.innerHTML = `
        <a href='https://www.linkedin.com/in/ethan-albright-2928721b8/' target='_blank' style="display: inline-block; margin-right: 10px;">
        <img src='/images/linkedin.png' style="width: 140px; height: 100px;"></img>
        </a>
        <a href='https://github.com/EMAlbright' target='_blank' style="display: inline-block;">
        <img src='/images/github.png' style="width: 80px; height: 80px;"></img>
        </a>
        `;

        me.appendChild(openTo);
        me.appendChild(hometown);
        me.appendChild(languageTitle);
        me.appendChild(languages);
        me.appendChild(contact);
        me.appendChild(socials);
        textContainer.appendChild(me);
    
        return textContainer;
};
