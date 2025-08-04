// src/pages/LandingPage.jsx
import React, { useState, useEffect } from 'react';
import { tsParticles } from 'tsparticles-engine';
import { loadFull } from 'tsparticles';

const messages = [
  "It's your special day",
  "to make something special for you",
  "because you are special to me.",
  "Do you want to see what I made?",
];

function LandingPage({ onComplete }) {
  const [step, setStep] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [showHint, setShowHint] = useState(true);

  // This hook handles the particle background
  useEffect(() => {
    const cosmicNightOptions = {
      fullScreen: { 
        enable: false
      },
      particles: {
        number: { value: 100 },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: { min: 0.1, max: 0.6 } },
        size: { value: { min: 1, max: 2.5 } },
        links: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.1,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.2,
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "grab",
          },
        },
        modes: {
          grab: {
            distance: 150,
            links: { opacity: 0.3 }
          },
        },
      },
      background: { color: "transparent" }
    };

    let container;
    async function init() {
      await loadFull(tsParticles);
      container = await tsParticles.load({ id: "landing-particles", options: cosmicNightOptions });
    }
    init();

    return () => {
      if (container) {
        container.destroy();
      }
    };
  }, []);

  const handleTextClick = () => {
    if (showHint) {
      setShowHint(false);
    }
    if (step < messages.length - 1) { 
      setStep(step + 1); 
    }
  };

  const handleNoHover = () => {
    if (noCount < 5) {
      setNoCount(noCount + 1);
      const newTop = Math.floor(Math.random() * 200) - 100;
      const newLeft = Math.floor(Math.random() * 200) - 100;
      setNoButtonPosition({ top: newTop, left: newLeft });
    }
  };

  const renderContent = () => {
    if (step === messages.length - 1) {
      return (
        <>
          {noCount >= 3 && <p className="defeat-message">Okay, okay, you win... but you still have to click yes! 😆 </p>}
          <h2 key={step}>{messages[step]}</h2>
          <div className="button-container">
            <button className="yes-button" onClick={onComplete}>Yes</button>
            <button
              className={`no-button ${noCount >= 5 ? 'defeated' : ''}`}
              style={{ position: 'relative', top: `${noButtonPosition.top}px`, left: `${noButtonPosition.left}px` }}
              onMouseEnter={handleNoHover}
            >
              No
            </button>
          </div>
        </>
      );
    }
    return <h1 key={step}>{messages[step]}</h1>;
  };

  return (
    <div className="landing-container">
      <div id="landing-particles" className="particles-canvas"></div>
      <div className="landing-content-wrapper" onClick={handleTextClick}>
        {renderContent()}
        {showHint && <p className="click-hint"></p>}
      </div>
    </div>
  );
}

export default LandingPage;
