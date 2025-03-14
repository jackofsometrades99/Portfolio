// src/App.js
import React from 'react';
import './App.css';
import './assets/fonts/Fonts.css';
import { Canvas } from '@react-three/fiber'; // Import Canvas from R3F
import ThreeParticles from './components/ThreeParticles';
import Skills from './components/Skills'; // Assuming you have a Skills component
import WorkExperience from './components/WorkExperience'; // Assuming you have a Skills component
import { FaEnvelope, FaLinkedin, FaFileDownload } from 'react-icons/fa';

// Import images using ES6 imports
import blackme from './images/black_me.png'; // Ensure this file is correctly named and present
import PersonalProjects from './components/PersonalProjects';

function App() {
  return (
    <div className="App">
      {/* Full-Screen Intro Section */}
      <section className="intro-section">
        {/* Three.js Particles Background within Canvas */}
        <Canvas
          camera={{ position: [0, 0, 50], fov: 75 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: '#000000'
          }}
        >
          <ambientLight intensity={0.5} />
          <ThreeParticles />
        </Canvas>

        {/* Intro Content */}
        <div className="intro-content">
          {/* Wrap "S." in an anchor tag linking to the "About Me" section */}
          <h1 className="catchy-phrase">
            <a href="#about" aria-label="Go to About Me section">S.</a>
          </h1>
          <p className="intro-subtitle">Transforming Ideas into Scalable Solutions</p>
        </div>
      </section>

      {/* About Section with ID for Linking */}
      <section className="about-section container-fluid" id="about">
        <div className="row align-items-center">
          {/* Image Column */}
          <div className="col-md-6 image-container">
            <div className="image-wrapper">
              <img src={blackme} alt="Profile Black" className="image blue-image" />
            </div>
          </div>

          {/* Text Column */}
          <div className="col-md-6 text-container">
            <h2>Hi human!</h2>
            <p>
              I'm a passionate Software Developer with expertise in Backend Development and Deployment. I specialize in building scalable microservices-based architectures that drive efficiency and innovation.
            </p>
            <p>
              My journey in software development is fueled by a constant curiosity to solve complex problems and a commitment to writing clean, maintainable code. I thrive in collaborative environments where sharing ideas and continuous learning are at the forefront.
            </p>
            <p>
              I’ve had the privilege of working on projects that have not only optimized operations but also empowered businesses to scale. From cloud-based solutions to containerized deployments, I’m always exploring new technologies to push the boundaries of what’s possible.
            </p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container-fluid my-5">
        <Skills />
      </section>

      {/* Work Experience Section */}
      <section className="container my-5">
        <WorkExperience />
      </section>

      {/*Personal Projects Section */}
      <section className="container my-5">
        <PersonalProjects />
      </section>

      {/* Contact Section */}
      <section className="container-fluid contact-section">
        <i className='contact-section-text'>Let's connect! Reach out on any of the platforms below.</i>
        <div className="contact-icons">
          <a
            href="get4sambhugn.work@gmail.com"
            className="contact-icon"
            title="Email"
          >
            <FaEnvelope />
            <span className="tooltip">Email</span>
          </a>
          <a
            href="https://www.linkedin.com/in/sambhu-nampoothiri-g-5b07371b1"
            className="contact-icon"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
          >
            <FaLinkedin />
            <span className="tooltip">LinkedIn</span>
          </a>
          <a
            href="https://drive.google.com/file/d/1Gnhjjbn8K0EBWy2M6FwL0OL7aAvFFQKT/view?usp=sharing"
            className="contact-icon"
            download="Sambhu_Nampoothiri_G.pdf"
            title="Resume"
          >
            <FaFileDownload />
            <span className="tooltip">Resume</span>
          </a>
        </div>
        {/* Watermark copyright in the corner */}
        <div className="watermark">© 2025 Sambhu Nampoothiri G. All rights reserved.</div>
      </section>
    </div>
  );
}

export default App;
