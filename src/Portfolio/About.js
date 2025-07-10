import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import "./common.css";

const About = () => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/about.json")
      .then((response) => response.json())
      .then((data) => {
        setAboutData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching about data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!aboutData) {
    return <div className="loading">Error loading data</div>;
  }

  return (
    <motion.div
      className="card about"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>About Me</h2>
      <hr />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="name-container">
          <span className="name">{aboutData.name}</span>
        </div>
        <p>{aboutData.bio}</p>
        <h3>Education</h3>
        {aboutData.education.map((edu, index) => (
          <motion.div
            key={index}
            className="education-item"
            style={{ "--index": index }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <p>
              <strong>{edu.degree}</strong> - {edu.institution} ({edu.duration})
              <br />
              Percentage: {edu.percentage}%
            </p>
          </motion.div>
        ))}
        <h3>Experience</h3>
        {aboutData.experience.map((exp, index) => (
          <motion.div
            key={index}
            className="experience-item"
            style={{ "--index": index }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <p>
              <strong>{exp.role}</strong> at {exp.company}, {exp.location} (
              {exp.duration})<br />
              {exp.responsibilities.map((resp, i) => (
                <span key={i}>
                  - {resp}
                  <br />
                </span>
              ))}
              <a href={exp.link} target="_blank" rel="noopener noreferrer">
                View Certificate
              </a>
            </p>
          </motion.div>
        ))}
      </motion.div>
      <Link to="/" className="back-link">
        <FontAwesomeIcon icon={faHouse} className="back-icon" />
        <span className="back-tooltip">Back to Home</span>
      </Link>
    </motion.div>
  );
};

export default About;
