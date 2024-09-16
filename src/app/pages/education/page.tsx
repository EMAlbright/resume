"use client"

const education = [
    {
    school: 'University of Washington',
    duration: 'September 2020 - December 2024',
    degree: 'Bachelor of Applied Science - Applied Computing',
    minor: 'Minor - Business Administration'
    },
    {
    school: 'Woodinville High School',
    duration: 'September 2016 - June 2020',
    degree: 'G.E.D'
    }
]

const courses = [
    {
        
    }
]

const Education: React.FC = () => {
    return (
        <div className="w-full min-h-screen bg-black p-5">
          <header className="flex items-center">
            <button 
              className="-mt-28 px-10 py-2.5 bg-[#db4a8f] text-white rounded cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#ff69b4]"
              onClick={() => window.history.back()}
            >
              Back
            </button>
            <div className="flex gap-20 px-40 ml-96">
              <a className='-mt-8' href='https://www.linkedin.com/in/ethan-albright-2928721b8/' target='_blank'>
                <img src='/images/linkedin.png'></img>
              </a>
              <a href='https://github.com/EMAlbright' target='_blank'>
                <img src='/images/github.png'></img>
              </a>
            </div>
          </header>
          
          <div className="flex flex-col items-center flex-wrap gap-20 padding-10 justify-center p-5">
            {education.map((edu, index) => (
              <div 
                key={index} 
                className="bg-white bg-opacity-10 p-5 rounded-lg shadow-lg transition-all duration-300 ease-in-out w-[750px] text-center hover:translate-y-[-10px] hover:shadow-xl"
              >
                <h2 className="text-2xl text-[#ffd700] mb-2.5">{edu.school}</h2>
                <h3 className="text-xl text-[#4B2E83]">{edu.degree}</h3>
                <h2 className="text-xl text-[#4B2E83]">{edu.minor}</h2>
                <p className="text-base text-[#ddd] mb-4">{edu.duration}</p>
              
              </div>
            ))}
          </div>
        </div>
      );
}

export default Education;