// src/pages/SparkleCursor.jsx
import React, { useEffect } from 'react';

function SparkleCursor() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle-cursor';
      document.body.appendChild(sparkle);

      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;

      setTimeout(() => {
        sparkle.remove();
      }, 1000); // The sparkle fades out after 1 second
    };

    // Add the event listener to the window
    window.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener when the component is no longer on the screen
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // The empty array ensures this effect runs only once

  return null; // This component doesn't render any visible HTML itself
}

export default SparkleCursor;
