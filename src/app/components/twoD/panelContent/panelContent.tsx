export const CreateAboutText = () => (
  <div className="mt-16" style={{ fontFamily: "'Oxanium', sans-serif" }}>
    <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@200&display=swap" rel="stylesheet"></link>

    <h2 className="text-4xl text-center mb-6">Hi there! My name is Ethan Albright</h2>
    <p className="text-xl text-center mb-6 text-custom-green">
      Aspiring software developer who creates purposeful applications with a variety of technologies and tools.
    </p>
    <p className="text-lg text-center font-strong text-custom-green mb-10">
      Based out of Seattle, WA
    </p>
    <h3 className="text-3xl text-center mb-8">When I&apos;m Not Coding:</h3>
    <p className="text-lg text-center text-custom-green mb-12">
      Outside of software and hardware, I enjoy playing chess, watching UFC, working out, and hanging out with my friends.
    </p>

    <h3 className="text-3xl text-center mb-8">What I&apos;m Working On:</h3>
    <p className="text-lg text-center text-custom-green font-medium mb-16 leading-relaxed">
      I am currently building an intelligent autonomous robot, leveraging the power of open-source vision and language models, along with other APIs. 
      There has never been a better time for independent developers to innovate and scale than now, and I plan to fully seize this opportunity. 
      My project combines a Raspberry Pi 5, a camera, various hardware components, and Python to bring this idea to life. 
      Along the way, I am continuously learning about new technologies to enhance my skills and push the boundaries of what is possible.
    </p>

    <h3 className="text-3xl text-center mb-8">Languages & Tools I Use:</h3>
    <div className="grid grid-cols-3 gap-6 text-lg text-center mb-20">
      <div>Python</div>
      <div>TypeScript/JavaScript</div>
      <div>Java</div>
      <div>SQL</div>
      <div>PostgreSQL</div>
      <div>MongoDB</div>
      <div>Flask</div>
      <div>React & Next.js</div>
      <div>React Native</div>
      <div>Firebase</div>
      <div>AWS</div>
      <div>RESTful APIs</div>
    </div>

    <div className="text-2xl text-center text-custom-green mb-12">
      <p>Feel free to contact me at <div className="text-3xl">EthanMacAlbright@gmail.com</div></p>
    </div>

    <div className="text-center">
      <p>
        <a
          href="https://www.linkedin.com/in/ethan-albright-2928721b8/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-block', marginRight: '15px' }}
        >
          <img src="/images/linkedin.png" alt="LinkedIn" style={{ width: '180px', height: '120px' }} />
        </a>
      </p>
      <p>
        <a
          href="https://github.com/EMAlbright"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-block' }}
        >
          <img src="/images/github.png" alt="GitHub" style={{ width: '80px', height: '80px' }} />
        </a>
      </p>
    </div>
  </div>
);

  
  export const CreateExperienceText = () => (
    <div className="text-center mt-12" style={{ fontFamily: "'Oxanium', sans-serif" }}>
    <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@500&display=swap" rel="stylesheet"></link>
    <div>
      <h2 className="text-2xl mb-4">Software Developer: Fast Enterprises</h2>
      <p className="text-xl text-custom-green mb-12">August 2025 - Present</p>
      <p className="text-xl">
        As a Software Developer, I worked on modernizing legacy government systems by converting applications from VB.NET to C#. 
        This involved redesigning and re-implementing core functionality to improve performance, maintainability, and long-term scalability.
        I also helped migrate databases from Microsoft SQL Server to PostgreSQL, resolving compatibility issues and optimizing queries to improve efficiency and system performance. 
        Throughout both efforts, I debugged and troubleshot issues across the application and database layers to support a smooth transition to the modernized systems.
      </p>
    </div>
  </div>
  );
  
  export const CreateProjectText = () => (
    <div className="mt-12" style={{ fontFamily: "'Oxanium', sans-serif" }}>
    <link href="https://fonts.googleapis.com/css2?family=Oxanium:wght@500&display=swap" rel="stylesheet"></link>
    <div className="text-center">

    <h2 className="text-2xl mb-4 mt-4">Unifund - A Group Budgeting and Expense Tracker</h2>
    <p className="text-xl mb-4 text-custom-green">
      UniFund was my capstone project (completed in autumn 2024) and is designed to help groups effectively manage collective expenses and shared financial obligations.
      This cross native mobile application enables users to create joint budgeting plans, allocate funds, assign roles within the group, and track spending habits and expenses transparently. 
      It also allows members to confirm payments made among one another, fostering accountability.
      Users can propose changes to group budgets or their specific categories by creating petitions, which are then subject to a group vote for approval. 
      To support these functionalities, I implemented a notification system, search and invitation features, real-time data updates, and a comprehensive NoSQL database structure.
      UniFund addresses a common but often overlooked challenge faced by roommates and other established groups: managing inter-group finances. 
    </p>
      <div className="text-xl">Scan This QR Code To Try It Out</div>
      <div className="text-s">Note*: Expo Go Must Be Downloaded To Use This Application</div>
      <div className="flex justify-center mb-8 mt-8">
      <img src='/images/expo.png' alt='UniFund QR Code' style={{ width: '160px', height: '160px' }} />
      </div>
    <a href="https://github.com/EMAlbright/PUBLIC_UniFund" target="_blank">View Code</a>
    

    <h2 className="text-2xl mb-4 mt-16">Networked Multiplayer API</h2>
    <p className="text-xl mb-4 text-custom-green">
      Worked alongside two other peers to create a networked multiplayer API as a final project for our Game Engine Development course. 
      Our work was published in Apress &apos;Build your own 2D Game Engine, Second Edition&apos;. Below, you can see a short demo of our implementation
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
    A market trading simulator that allows users to practice trading stocks as well as cryptocurrencies with &apos;money&apos; and see performance results.
    This web app also allows users to backtest popular trading strategies over a specified timeline with S&P stocks.
    </p>
    <div className="flex justify-center items-center mb-4">
    <video 
        className="block" 
        width="550" 
        height="400" 
        controls
    >
        <source src="/demoVideos/stockMarket.mp4" type="video/mp4" />
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
      <p className="text-2xl text-custom-green mb-10">Minor in Data Science & Business Administration</p>
      <h4 className="text-xl text-custom-green mb-8">Relevant Courses (Besides The Basics):</h4>
      <div className="grid grid-cols-3 gap-4 text-l text-center">
        <div> Applied Algorithmics </div>
        <div> Programming For Data Science</div>
        <div> Data Visualization </div>
        <div> Game Engine Development </div>
        <div> Matrix Algebra </div>
        <div> Database Systems </div>
        <div> Product Development </div>
        <div> Network Architecture </div>
        <div> Web Media Programming </div>
      </div>
      <h2 className="text-4xl font-bold mb-4 mt-12">Woodinville High School</h2>
      <p className="text-2xl mb-4">2016 - 2020</p>
      <p className="text-2xl text-custom-green mb-6">G.E.D</p>
      <h4 className="text-xl text-custom-green mb-8">Activities While Attending: </h4>
      <div className="grid grid-cols-2 gap-4 text-l text-center">
        <div> DECA </div>
        <div> Spanish Club </div>
        <div> National Honor Society </div>
        <div> Unified Soccer Coach </div>
        <div> School Student Store </div>
        <div> Basketball, Football, & Soccer </div>
      </div>
    </div>
  );