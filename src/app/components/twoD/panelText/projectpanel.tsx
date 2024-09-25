export const CreateProjectText = () => {
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
    const createProjectEntry = (title: string, description: string, demoLink: string, codeLink = '') => {
        const project = document.createElement('div');
        project.style.marginBottom = '20px';

        const projectTitle = document.createElement('h3');
        projectTitle.textContent = title;
        projectTitle.style.textAlign = 'center';
        projectTitle.style.margin = '0';
        projectTitle.style.fontSize = '22px';
        projectTitle.style.color = '#333';

        const projectDescription = document.createElement('p');
        projectDescription.innerHTML = description;
        projectDescription.style.margin = '5px 0';
        projectDescription.style.fontSize = '18px';
        projectDescription.style.color = '#667';

        const videoPlayer = document.createElement('video');
        videoPlayer.src = demoLink;
        videoPlayer.controls = true;
        videoPlayer.style.width = '90%';
        videoPlayer.style.marginBottom = '20px';

        const projectLinks = document.createElement('div');
            projectLinks.innerHTML = `
            ${codeLink ? `<a href="${codeLink}" target="_blank">View Code</a>` : 'The code for this project is in a private repository.'}
        `;

        projectLinks.style.fontSize = '20px';
        projectLinks.style.color = '#0073e6';

        project.appendChild(projectTitle);
        project.appendChild(projectDescription);
        project.appendChild(videoPlayer);
        project.appendChild(projectLinks);


        return project;
    };

    const project1 = createProjectEntry(
        'Networked Multiplayer API',
        'Worked in a team of 3 to create this API, in which our work was published in Apress Build your own 2D Game Engine, Second Edition.',
        '/demoVideos/multiplayer.mp4',
        'https://apress.github.io/build-your-own-2d-game-engine-2e/AdditionalMaterials/ExtraExamples/Winter-2024-NetworkAPI-Albright_Rigby_Taniguchi/docs/out/index.html'
    );

    const project2 = createProjectEntry(
        'Satire Trade - Market Simulator App',
        'A stock trading simulator that allows users to practice trading stocks with fake money and see performance results.\n Also allows users to backtest popular trading strategies over a specified timeline given a certain NASDAQ stock.',
        '/demoVideos/stockMarket.mp4',
        'https://github.com/EMAlbright/tradingapp'
    );

    const project3 = createProjectEntry(
        'ResumeAI - Job Matchmaking App',
        'A job matching application that suggests jobs based on user-uploaded resumes. The basic overview of this project was scraping job boards (Dice, Linkedin, Indeed), and storing relevant information in a postgreSQL database as well as their embedding vectors (which I attained through various HuggingFace models). ',
        '/demoVideos/resumeAI.mp4'
    );

    textContainer.appendChild(sectionTitle);
    textContainer.appendChild(project1);
    textContainer.appendChild(project2);
    textContainer.appendChild(project3);

    return textContainer;
    };
