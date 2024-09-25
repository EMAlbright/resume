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
    university.style.textAlign = 'center';
    const universityTitle = document.createElement('h3');
    universityTitle.innerHTML = `<span style="font-weight: bold;"> University of Washington </span>`;
    universityTitle.style.margin = '0';
    universityTitle.style.fontSize = '22px';
    universityTitle.style.color = 'black';

    const universityDetails = document.createElement('p');
    universityDetails.innerHTML = `
        <strong>Years:</strong> 2020 - 2024 (currently enrolled)<br>
        <strong>Major:</strong> Applied Computing<br>
        <strong>Minor:</strong> Data Science & Business Administration
    `;
    universityDetails.style.margin = '5px 0';
    universityDetails.style.fontSize = '18px';
    universityDetails.style.color = '#0073e6';

    university.appendChild(universityTitle);
    university.appendChild(universityDetails);

    // Woodinville High School
    const highSchool = document.createElement('div');
    highSchool.style.marginBottom = '20px';
    highSchool.style.textAlign = 'center';
    const highSchoolTitle = document.createElement('h3');
    highSchoolTitle.innerHTML = `<span style="font-weight: bold;"> Woodinville High School </span>`;
    highSchoolTitle.style.margin = '0';
    highSchoolTitle.style.fontSize = '22px';
    highSchoolTitle.style.color = 'black';

    const highSchoolDetails = document.createElement('p');
    highSchoolDetails.innerHTML = `
        <strong>Years:</strong> 2016 - 2020
    `;
    highSchoolDetails.style.margin = '5px 0';
    highSchoolDetails.style.fontSize = '18px';
    highSchoolDetails.style.color = '#0073e6';

    highSchool.appendChild(highSchoolTitle);
    highSchool.appendChild(highSchoolDetails);

    // Append both education sections to the container
    textContainer.appendChild(university);
    textContainer.appendChild(highSchool);

    return textContainer;
};
