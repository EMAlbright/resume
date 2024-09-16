"use client"
import React from 'react';

const experiences = [
  {
    title: 'Capstone Project Developer',
    company: 'University of Washington',
    duration: 'September 2024 - December 2024',
    description: 'TBD'
  },
  {
    title: 'Software/Web Developer',
    company: 'Self-Employed',
    duration: 'June 2024 - Present',
    description: 'Developed interactive, user-friendly web interfaces using React and Next.js. Building numerous web applications and software products.'
  },
  {
    title: 'Server',
    company: 'Piatti Restaraunt',
    duration: 'June 2022 - Present',
    description: 'Contributed to backend services using Node.js and Express. Led the integration of third-party APIs, increasing product efficiency.'
  },
  {
    title: 'Household facilitator',
    company: 'AGD (Alpha Gamma Delta)'
  
  }
];

const ExperiencePage: React.FC = () => {
  // add linkedin: https://www.linkedin.com/in/ethan-albright-2928721b8/
  // add git: https://github.com/EMAlbright
  return (
    <div className="w-full min-h-screen bg-black m-0 p-5">
      <header className="flex gap-20 items-center">
        <button 
          className="px-10 py-2.5 bg-[#db4a8f] text-white rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#ff69b4]"
          onClick={() => window.history.back()}
        >
          Back
        </button>
        <a className="pl-10" href='https://www.linkedin.com/in/ethan-albright-2928721b8/'><img src='/images/linkedin.png'></img></a>
        <a href='https://github.com/EMAlbright'><img src='/images/github.png'></img></a>
      </header>
      
      <div className="flex flex-col items-center flex-wrap gap-20 padding-10 justify-center p-5">
        {experiences.map((exp, index) => (
          <div 
            key={index} 
            className="bg-white bg-opacity-10 p-5 rounded-lg shadow-lg transition-all duration-300 ease-in-out w-[750px] text-center hover:translate-y-[-10px] hover:shadow-xl"
          >
            <h2 className="text-2xl text-[#ffd700] mb-2.5">{exp.title}</h2>
            <h3 className="text-xl text-[#db4a8f]">{exp.company}</h3>
            <p className="text-base text-[#ddd] mb-4">{exp.duration}</p>
            <p className="text-base text-[#ccc]">{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperiencePage;