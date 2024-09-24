export const CreateEducationText = () => {
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

    // University of Washington
    const university = document.createElement('div');
    university.style.marginBottom = '20px';
    const universityTitle = document.createElement('h3');
    universityTitle.textContent = 'University of Washington';
    universityTitle.style.margin = '0';
    universityTitle.style.fontSize = '22px';
    universityTitle.style.color = '#333';

    const universityDetails = document.createElement('p');
    universityDetails.innerHTML = `
        <strong>Years:</strong> 2020 - 2024<br>
        <strong>Major:</strong> Applied Computing<br>
        <strong>Minor:</strong> Data Science & Business Administration
    `;
    universityDetails.style.margin = '5px 0';
    universityDetails.style.fontSize = '18px';
    universityDetails.style.color = '#667';

    university.appendChild(universityTitle);
    university.appendChild(universityDetails);

    // Woodinville High School
    const highSchool = document.createElement('div');
    highSchool.style.marginBottom = '20px';
    const highSchoolTitle = document.createElement('h3');
    highSchoolTitle.textContent = 'Woodinville High School';
    highSchoolTitle.style.margin = '0';
    highSchoolTitle.style.fontSize = '22px';
    highSchoolTitle.style.color = '#333';

    const highSchoolDetails = document.createElement('p');
    highSchoolDetails.innerHTML = `
        <strong>Years:</strong> 2016 - 2020
    `;
    highSchoolDetails.style.margin = '5px 0';
    highSchoolDetails.style.fontSize = '18px';
    highSchoolDetails.style.color = '#666';

    highSchool.appendChild(highSchoolTitle);
    highSchool.appendChild(highSchoolDetails);

    // Append both education sections to the container
    textContainer.appendChild(university);
    textContainer.appendChild(highSchool);

    return textContainer;
};
