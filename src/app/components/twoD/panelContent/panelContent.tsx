export const CreateAboutText = () => (
  <div className="mt-12" style={{ fontFamily: "'Oxanium', sans-serif" }}>
  <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@200&display=swap" rel="stylesheet"></link>
  <h2 className="text-4xl text-center mb-4">Hi there! My name is Ethan Albright</h2>
  <p className="text-2xl text-center mb-4 text-custom-green">Open to all work in software development</p>
  <p className="text-xl text-center font-strong text-custom-green mb-12">Based out of Seattle, WA</p>
  <h3 className="text-4xl text-center mb-10 ">Languages & Tools I use:</h3>
      <div className="grid grid-cols-3 gap-4 text-xl text-center">
      <div>Python</div>
      <div>Typescript</div>
      <div>Javascript</div>
      <div>Java</div>
      <div>SQL</div>
      <div>Rust</div>
      <div>Flask</div>
      <div>React & Next.js</div>
      <div>PostgreSQL</div>
      <div>MongoDB</div>
      <div>AWS</div>
      <div>RESTful APIs</div>
      </div>
  <div className="text-2xl text-center mt-20 mb-10 text-custom-green"> <p>Feel free to contact me at EthanMacAlbright@gmail.com</p></div>
  <div className="text-l text-center"> 
    <p>
    <a href='https://www.linkedin.com/in/ethan-albright-2928721b8/' target='_blank' style={{ display: 'inline-block', marginRight: '10px' }}>
      <img src='/images/linkedin.png' alt='LinkedIn' style={{ width: '180px', height: '120px' }} />
    </a>
    </p>
    <p>
    <a href='https://github.com/EMAlbright' target='_blank' style={{ display: 'inline-block' }}>
      <img src='/images/github.png' alt='GitHub' style={{ width: '80px', height: '80px' }} />
    </a>
    </p>
  </div>
  </div>
  );
  
  export const CreateExperienceText = () => (
    <div className="text-center mt-12" style={{ fontFamily: "'Oxanium', sans-serif" }}>
    <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@500&display=swap" rel="stylesheet"></link>
    <div>
      <h2 className="text-2xl mb-4">Independent Software Developer</h2>
      <p className="text-xl text-custom-green mb-12">June 2024 - Present</p>
    </div>
    <div>
      <h2 className="text-2xl mb-4">Software Developer - Capstone</h2>
      <p className="text-xl text-custom-green mb-4">September 2024 - Present</p>
      <p className="text-xl text-custom-green">Currently working on a financial budgeting mobile application tailored towards students. 
        Working with industry experts as well as faculty to deliver weekly milestones and have a deliverable product
        by the end of the semester.</p>
    </div>

  </div>
  );
  
  export const CreateProjectText = () => (
    <div className="mt-12" style={{ fontFamily: "'Oxanium', sans-serif" }}>
    <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@500&display=swap" rel="stylesheet"></link>
    <div className="text-center">
    <h2 className="text-2xl mb-4 mt-4">Networked Multiplayer API</h2>
    <p className="text-xl mb-4 text-custom-green">
      Worked alongside two other peers to create a networked multiplayer API as a final project for our Game Engine Development course. 
      Our work was published in Apress' `Build your own 2D Game Engine, Second Edition`. Below, you can see a short demo of our implementation
      of this API in a simple zombie shooter esque game, where all 3 of us control our own respective squares from our local machines.
    </p>
    <div className="flex justify-center items-center mb-4">
    <video 
        className="block" 
        width="550" 
        height="400" 
        controls
    >
        <source src="/demoVideos/multiplayer.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    </div>
    <a href="https://apress.github.io/build-your-own-2d-game-engine-2e/AdditionalMaterials/ExtraExamples/Winter-2024-NetworkAPI-Albright_Rigby_Taniguchi/docs/out/index.html" target="_blank">View Code</a>
    
    
    <h2 className="text-2xl mb-4 mt-16">Satire Trade - A Trading Simulator</h2>
    <p className="text-xl mb-4 text-custom-green">
    A market trading simulator that allows users to practice trading stocks as well as cryptocurrencies with 'money' and see performance results.
    This web app also allows users to backtest popular trading strategies over a specified timeline with S&P stocks.
    </p>
    <div className="flex justify-center items-center mb-4">
    <video 
        className="block" 
        width="550" 
        height="400" 
        controls
    >
        <source src="/demoVideos/stockmarket.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    </div>
    <a href="https://github.com/EMAlbright/tradingapp" target="_blank">View Code</a>
    
    
    <h2 className="text-2xl mb-4 mt-16">Resume AI - A Job Matching Platform</h2>
    <p className="text-xl mb-4 text-custom-green">
      A job matching application that suggests jobs based on user-uploaded resumes. The basic overview of this project was scraping job boards (Dice, Linkedin, Indeed), 
      and storing relevant data in a postgreSQL database, including embedding vectors from sentence transformer ML models (all-mpnet-base-v2 and paraphrase-MiniLM-L6-v2).
      I then used Faiss for similarity search when comparing job vectors to user resume vectors.
    </p>
    </div>
    <div className="flex justify-center items-center mb-4">
    <video 
        className="block" 
        width="550" 
        height="400" 
        controls
    >
        <source src="/demoVideos/resumeAI.mp4" type="video/mp4" />
        Your browser does not support the video tag.
    </video>
    </div>
    <p className="text-center">The code for this project is in a private repository.</p>
  </div>
  );
  
  export const CreateEducationText = () => (
    <div className="text-center mt-12" style={{ fontFamily: "'Oxanium', sans-serif" }}>
    <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@500&display=swap" rel="stylesheet"></link>
      <h2 className="text-4xl font-bold mb-4 mt-4">University of Washington</h2>
      <p className="text-2xl mb-4">2020 - 2025</p>
      <p className="text-2xl text-custom-green">B.a.S of Applied Computing</p>
      <p className="text-2xl text-custom-green mb-12">Minor in Data Science & Business Administration</p>
      <h2 className="text-4xl font-bold mb-4">Woodinville High School</h2>
      <p className="text-2xl mb-4">2016 - 2020</p>
      <p className="text-2xl text-custom-green">G.E.D</p>
    </div>
  );