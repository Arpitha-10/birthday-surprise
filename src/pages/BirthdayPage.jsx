// src/pages/BirthdayPage.jsx
import React, { useEffect } from 'react';

function BirthdayPage({ onCelebrateClick }) {

  // NEW: This useEffect hook handles the sparkle trail
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Create a new sparkle element
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      
      // Position it at the cursor
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;

      // Add it to the page
      document.querySelector('.birthday-container-dreamy').appendChild(sparkle);

      // Remove the sparkle after its animation finishes
      setTimeout(() => {
        sparkle.remove();
      }, 1000); // 1000ms = 1 second
    };

    // Add the mousemove event listener
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // The empty array ensures this runs only once

  return (
    <div className="birthday-container-dreamy">
      <div className="glow-orb"></div>
      <div className="glow-orb"></div>
      <div className="glow-orb"></div>
      <div className="glow-orb"></div>

      <div className="birthday-content-dreamy">
        <h1>Happy Birthday!</h1>
        <p>You’ve been my constant, my safe place, and my biggest cheerleader — always 
          grateful for you.</p>
        <button className="celebrate-button" onClick={onCelebrateClick}>
          Let's Celebrate
        </button>
      </div>
    </div>
  );
}

export default BirthdayPage;