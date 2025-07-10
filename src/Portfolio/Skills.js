import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import "./common.css";

const Skills = () => {
  const [languages, setLanguages] = useState([]);
  const [frameworks, setFrameworks] = useState([]);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/skills.json")
      .then((response) => response.json())
      .then((data) => {
        if (data && data.programming_skills) {
          setLanguages(data.programming_skills.languages || []);
          setFrameworks(data.programming_skills.frameworks || []);
          setTools(data.programming_skills.tools_and_databases || []);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching skills data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <motion.div
      className="card skills"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Skills</h2>
      <hr />
      <h3>Languages</h3>
      {languages.length > 0 ? (
        <ul className="skills-list">
          {languages.map((skill, index) => (
            <motion.li
              key={index}
              style={{ "--index": index }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {skill}
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="no-skills">No languages listed.</p>
      )}

      <h3>Frameworks</h3>
      {frameworks.length > 0 ? (
        <ul className="skills-list">
          {frameworks.map((skill, index) => (
            <motion.li
              key={index}
              style={{ "--index": index }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {skill}
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="no-skills">No frameworks listed.</p>
      )}

      <h3>Tools and Databases</h3>
      {tools.length > 0 ? (
        <ul className="skills-list">
          {tools.map((skill, index) => (
            <motion.li
              key={index}
              style={{ "--index": index }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {skill}
            </motion.li>
          ))}
        </ul>
      ) : (
        <p className="no-skills">No tools or databases listed.</p>
      )}

      <Link to="/" className="back-link">
        <FontAwesomeIcon icon={faHouse} className="back-icon" />
        <span className="back-tooltip">Back to Home</span>
      </Link>
    </motion.div>
  );
};

export default Skills;
