// src/components/PersonalProjects.js
import React from 'react';
import './PersonalProjects.css';

// Import your logo images (ensure these images exist in your assets folder)
import pythonLogo from '../images/python_logo.png';
import githubLogo from '../images/github_logo.png';
import mediumLogo from '../images/medium_logo.png';

const projectsData = [
  {
    title: 'Open Source Developments',
    link: 'https://pypi.org/project/pyNetX/',
    description: 'Python library to handle NETCONF Operations',
    type: 'python',
  },
  {
    title: 'Technical Blogs',
    link: 'https://medium.com/@get4sambhugn',
    description: 'Technical Blogs I have written.',
    type: 'medium',
  },
  {
    title: 'GitHub',
    link: 'https://github.com/jackofsometrades99',
    description: 'Github Account with multiple projects I have worked on.',
    type: 'github',
  }
];

const getLogo = (type) => {
  switch (type) {
    case 'python':
      return pythonLogo;
    case 'medium':
      return mediumLogo;
    case 'github':
    default:
      return githubLogo;
  }
};

const getBackgroundGradient = (type) => {
  switch (type) {
    case 'python':
      // Python's blue and yellow gradient
      return 'linear-gradient(135deg, #306998, #FFD43B)';
    case 'medium':
      // A gradient that complements Medium's style
      return 'linear-gradient(135deg, #00ab6c, #ffffff)';
    case 'github':
    default:
      // A darker gradient for GitHub projects
      return 'linear-gradient(135deg, #24292e, #586069)';
  }
};

const PersonalProjects = () => {
  return (
    <section className="container my-5 personal-projects-section">
      <h2>Personal Projects</h2>
      <div className="projects-grid">
        {projectsData.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            style={{ background: getBackgroundGradient(project.type) }}
          >
            <div className="card-overlay">
              <img
                src={getLogo(project.type)}
                alt={`${project.type} logo`}
                className="project-logo"
              />
              <div className={`project-text ${project.type === 'medium' ? 'medium-text' : ''}`}>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default PersonalProjects;
