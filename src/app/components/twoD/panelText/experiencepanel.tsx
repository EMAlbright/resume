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
    
        // main outline for each project
        // title, description, video demo, code link
        const createExperienceEntry = (title: string, description: string, date: string) => {
            // main
            const project = document.createElement('div');
            project.style.marginBottom = '20px';
            project.style.padding = '10px'; 
            // add light border around each experience
            project.style.border = '1px solid #999'; 
            //work title
            const workTitle = document.createElement('h3');
            workTitle.textContent = title;
            workTitle.style.margin = '0';
            workTitle.style.fontSize = '22px';
            workTitle.style.color = '#333';
            // description of job
            const workDescription = document.createElement('p');
            workDescription.innerHTML = description;
            workDescription.style.margin = '5px 0';
            workDescription.style.fontSize = '18px';
            workDescription.style.color = '#0073e6';
            
            // create container to put in right
            const dateContainer = document.createElement('div'); 
            dateContainer.style.display = 'flex';             
            dateContainer.style.justifyContent = 'flex-end';  
        
            const dateElement = document.createElement('span'); 
            dateElement.textContent = date;
            dateElement.style.fontSize = '16px';             
            dateElement.style.color = '#667'; 
            
            // add all elements
            dateContainer.appendChild(dateElement); 
            project.appendChild(workTitle);         
            project.appendChild(workDescription);   
            project.appendChild(dateContainer);     
        
            return project;
        };
    
        const job1 = createExperienceEntry(
            'Independent Software Developer',
            '',
            'March 2024 - Present'        
        );
    
        const job2 = createExperienceEntry(
            'Software Developer - UW Capstone',
            'Developed a mobile budgeting application using React Native and TypeScript, leveraging Firebase for real-time data synchronization and user authentication. The app empowers users to manage their income and expenses, providing optimized budgeting strategies with ML models, spending analytics, and goal tracking features to enhance financial decision-making.',
            'September - December 2024'
        );
    
        const job3 = createExperienceEntry(
            'Restaraunt Server',
            '',
            'June 2022 - Present'
        );
    
        textContainer.appendChild(job1);
        textContainer.appendChild(job2);
        textContainer.appendChild(job3);
    
        return textContainer;
};
    
