"use client"
import React from 'react';
import './experience.css'; // Importing CSS for styling

const experiences = [
  {
    title: 'Front-End Developer',
    company: 'TechCorp Inc.',
    duration: 'Jan 2022 - Present',
    description: 'Developed interactive, user-friendly web interfaces using React and Next.js. Improved performance by 30% through code optimizations.'
  },
  {
    title: 'Junior Software Engineer',
    company: 'CodeWorks Ltd.',
    duration: 'Mar 2020 - Dec 2021',
    description: 'Contributed to backend services using Node.js and Express. Led the integration of third-party APIs, increasing product efficiency.'
  },
  // Add more experiences here
];

const ExperiencePage: React.FC = () => {
  return (
    <div className='container'>
      <header className='header'>
        <h1 className='title'>Experience</h1>
        <button className='backButton' onClick={() => window.history.back()}>
          Back
        </button>
      </header>
      
      <div className='experienceContainer'>
        {experiences.map((exp, index) => (
          <div key={index} className='experienceCard'>
            <h2 className='jobTitle'>{exp.title}</h2>
            <h3 className='company'>{exp.company}</h3>
            <p className='duration'>{exp.duration}</p>
            <p className='description'>{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePage;
