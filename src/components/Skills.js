// src/components/Skills.js
import React from 'react';
import './Skills.css';

// Importing all skill images
import deeplearningLogo from '../images/deeplearning_logo.png';
import dockerLogo from '../images/docker_logo.png';
import elasticsearchLogo from '../images/elasticsearch_logo.png';
import flaskLogo from '../images/flask_logo.png';
import grafanaLogo from '../images/grafana_logo.png';
import gunicornLogo from '../images/gunicorn_logo.png';
import influxdbLogo from '../images/influxdb_logo.webp';
import k8Logo from '../images/k8_logo.png';
import kafkaLogo from '../images/kafka_logo.png';
import kibanaLogo from '../images/kibana_logo.png';
import mongodbLogo from '../images/mongodb_logo.png';
import prometheusLogo from '../images/prometheus_logo.png';
import pythonLogo from '../images/python_logo.png';
import redisLogo from '../images/redis_logo.png';
import restLogo from '../images/rest_logo.png';
import fastapilogo from '../images/fastapi_logo.png';

const skills = [
  { name: 'Docker', logo: dockerLogo },
  { name: 'Elasticsearch', logo: elasticsearchLogo },
  { name: 'Flask', logo: flaskLogo },
  { name: 'Deep Learning', logo: deeplearningLogo },
  { name: 'Grafana', logo: grafanaLogo },
  { name: 'Gunicorn', logo: gunicornLogo },
  { name: 'InfluxDB', logo: influxdbLogo },
  { name: 'Kubernetes', logo: k8Logo },
  { name: 'Kafka', logo: kafkaLogo },
  { name: 'Kibana', logo: kibanaLogo },
  { name: 'MongoDB', logo: mongodbLogo },
  { name: 'Prometheus', logo: prometheusLogo },
  { name: 'Python', logo: pythonLogo },
  { name: 'Redis', logo: redisLogo },
  { name: 'REST APIs', logo: restLogo },
  { name: 'FastAPI', logo: fastapilogo },
];

const Skills = () => {
  return (
    <div className="skills-section">
      <h2 className="skills-title">Expertise</h2>
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <img src={skill.logo} alt={`${skill.name} logo`} className="skill-logo" />
            <p className="skill-name">{skill.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
