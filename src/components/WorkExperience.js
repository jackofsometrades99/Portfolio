// src/components/WorkExperience.js
import React, { useState } from 'react';
import './WorkExperience.css';

const workData = [
  {
    title: 'Senior Backend Developer',
    company: 'HFCL',
    date: 'Jul 2022 - Present',
    description:
      'Currently working as the senior backend developer for EMS/NMS which manages NETCONF based transport routers.',
  },
  {
    title: 'CI/CD Intern',
    company: 'HFCL',
    date: 'Jun 2018 - Dec 2019',
    description:
      'Made a CI/CD pipeline using Jenkins which can automatically build the code, test, and push to production.',
  },
  {
    title: 'Developer Intern',
    company: 'Techfunic',
    date: 'Jul 2021 - Jan 2022',
    description:
      'Made code to automatically transfer the video files from Zoom to their cloud storage in GCP using cron functions.',
  },
  {
    title: 'EdgeAI Intern',
    company: 'TrEST Park',
    date: 'Jun 2021 - Jul 2021',
    description:
      'Worked in implementing neural networks for ESP2866 microcontroller to perform object classification in openCV',
  },
  {
    title: 'ML Intern',
    company: 'SpenGeoTec',
    date: 'Jul 2020 - Jun 2021',
    description:
      'Worked in making NLP sentiment analysis classifier that can effectively classify emotions in text.',
  },
];

const WorkExperience = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // Each card has a total width of 300px + 20px margin = 320px.
  // The inline style shifts the slider so that the active card is centered.
  const cardWidth = 320;
  const sliderStyle = {
    transform: `translateX(calc(50% - ${activeIndex * cardWidth + 150}px))`,
  };

  const prevSlide = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const nextSlide = () => {
    if (activeIndex < workData.length - 1) setActiveIndex(activeIndex + 1);
  };

  return (
    <section className="container my-5 work-experience-section">
      <h2>Professional Experience</h2>
      <div className="carousel-container">
        <button
          className="carousel-button left"
          onClick={prevSlide}
          disabled={activeIndex === 0}
          aria-label="Previous"
        >
          &#10094;
        </button>
        <div className="carousel-slider" style={sliderStyle}>
          {workData.map((item, index) => (
            <div key={index} className={`carousel-card ${index === activeIndex ? 'active' : ''}`}>
              <h3>{item.title}</h3>
              <h6>{item.company}</h6>
              <span className="carousel-date">{item.date}</span>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
        <button
          className="carousel-button right"
          onClick={nextSlide}
          disabled={activeIndex === workData.length - 1}
          aria-label="Next"
        >
          &#10095;
        </button>
      </div>
    </section>
  );
};

export default WorkExperience;
