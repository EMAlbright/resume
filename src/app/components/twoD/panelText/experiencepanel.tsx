    export const CreateExperienceText = () => {
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
    
        const sectionTitle = document.createElement('div');
        sectionTitle.style.textAlign = 'center';
        sectionTitle.style.fontSize = '28px';
        sectionTitle.style.color = 'black';
        sectionTitle.style.marginBottom = '20px';
        sectionTitle.innerHTML = `<strong>Projects</strong><br>`;
    
        // main outline for each project
        // title, description, video demo, code link
        const createExperienceEntry = (title: string, description: string, date: string) => {
            const project = document.createElement('div');
            project.style.marginBottom = '20px';
    
            const workTitle = document.createElement('h3');
            workTitle.textContent = title;
            workTitle.style.margin = '0';
            workTitle.style.fontSize = '22px';
            workTitle.style.color = '#333';
    
            const workDescription = document.createElement('p');
            workDescription.innerHTML = description;
            workDescription.style.margin = '5px 0';
            workDescription.style.fontSize = '18px';
            workDescription.style.color = '#667';
    
            project.appendChild(workTitle);
            project.appendChild(workDescription);
    
    
            return project;
        };
    
        const project1 = createExperienceEntry(
            '',
            '',
            ''        
        );
    
        const project2 = createExperienceEntry(
            '',
            '',
            ''
        );
    
        const project3 = createExperienceEntry(
            '',
            '',
            ''
        );
    
        textContainer.appendChild(sectionTitle);
        textContainer.appendChild(project1);
        textContainer.appendChild(project2);
        textContainer.appendChild(project3);
    
        return textContainer;
};
    
