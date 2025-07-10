import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./common.css";

const Homepage = () => {
  const [tagline, setTagline] = useState("");
  const fullTagline = "Building the Future, One Line of Code at a Time";
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Typing effect for tagline
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullTagline.length) {
        setTagline(fullTagline.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    // Generate particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 5 + 2,
      left: Math.random() * 100,
      animationDelay: Math.random() * 5,
    }));
    setParticles(newParticles);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <motion.div
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              animationDelay: `${particle.animationDelay}s`,
            }}
          />
        ))}
      </div>
      <div className="hero-content">
        <h1 className="portfolio-title">Welcome to My Portfolio</h1>
        <p className="tagline">{tagline}</p>
      </div>
    </motion.div>
  );
};

export default Homepage;
