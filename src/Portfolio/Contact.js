import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { motion } from "framer-motion";
import "./common.css";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/about.json")
      .then((response) => response.json())
      .then((data) => {
        const info = [
          { icon: faEnvelope, text: data.email, link: `mailto:${data.email}` },
          { icon: faPhone, text: data.phone, link: `tel:${data.phone}` },
          { icon: faMapMarkerAlt, text: data.location, link: "#" },
          { icon: faLinkedin, text: "LinkedIn Profile", link: data.linkedin },
          { icon: faGithub, text: "GitHub Profile", link: data.github },
        ];
        setContactInfo(info);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching contact data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <motion.div
      className="card contact"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Contact</h2>
      <hr />
      {contactInfo.map((info, index) => (
        <motion.div
          key={index}
          className="contact-item"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          {info.link.startsWith("#") ? (
            <span className="contact-icon-wrapper">
              <FontAwesomeIcon icon={info.icon} className="contact-icon" />
              <span className="contact-tooltip">{info.text}</span>
              <span className="contact-text">{info.text}</span>
            </span>
          ) : (
            <a
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-icon-wrapper"
            >
              <FontAwesomeIcon icon={info.icon} className="contact-icon" />
              <span className="contact-tooltip">{info.text}</span>
              <span className="contact-text">{info.text}</span>
            </a>
          )}
        </motion.div>
      ))}
      <Link to="/" className="back-link">
        <FontAwesomeIcon icon={faHouse} className="back-icon" />
        <span className="back-tooltip">Back to Home</span>
      </Link>
    </motion.div>
  );
};

export default Contact;
