// src/pages/PhotoGallery.jsx
import React, { useState } from 'react';

// --- 1. Import all of your photos ---
import photo1 from '../assets/photo1.jpeg';
import photo2 from '../assets/photo2.jpeg';
import photo3 from '../assets/photo3.jpeg';
import photo4 from '../assets/photo4.jpeg';
import photo5 from '../assets/photo5.jpeg';
import photo6 from '../assets/photo6.jpeg';
import photo7 from '../assets/photo7.jpeg';
import photo8 from '../assets/photo8.jpeg';
import photo20 from '../assets/photo20.jpeg';
import photo10 from '../assets/photo10.jpeg';
import photo12 from '../assets/photo12.jpeg';
import photo21 from '../assets/photo21.jpeg';
import photo14 from '../assets/photo14.jpeg';
import photo15 from '../assets/photo15.jpeg';
import photo16 from '../assets/photo16.jpeg';
import photo17 from '../assets/photo17.jpeg';
import photo18 from '../assets/photo18.jpeg';
import photo19 from '../assets/photo19.jpeg';
import photo22 from '../assets/photo22.jpeg';
import photo23 from '../assets/photo23.jpeg';
import photo24 from '../assets/photo24.jpeg';


// --- 2. Your custom photo order and captions ---
const photos = [
    { id: 24, src: photo24, caption: 'Just two wholesome cuties. (Until we start talking again😂)' },
    { id: 22, src: photo22, caption: 'That smile when her book boyfriend calls her a good girl 😏📖' },
  { id: 23, src: photo23, caption: 'Happy couple💘' },
    { id: 16, src: photo16, caption: 'Ondu breakup kathe😂' },
  { id: 1, src: photo1, caption: 'as long as im with you ive got a smile on my face.' },
  { id: 2, src: photo2, caption: 'YES! you need one.' },
  { id: 17, src: photo17, caption: 'May we both find someone who looks at us the way we look at each other here😂' },
  { id: 3, src: photo3, caption: "Who's this diva?😂"},
  { id: 7, src: photo7, caption: 'We’re happy, free, confused, and single at the same time' },
  
  { id: 21, src: photo21, caption: 'Home is wherever I am with you' },
  { id: 5, src: photo5, caption: 'Looks like a saint, thinks like a sinner 😇😈' },
   { id: 8, src: photo8, caption: 'Dumb & Dumber' },
    { id: 20, src: photo20, caption: 'This one’s a classic🫶, you know why 😂' },
     { id: 12, src: photo12, caption: 'A little blurry, a lot of love 💫❤️' },
    { id: 18, src: photo18, caption: 'Just a reminder of how much you mean to me' },
  { id: 6, src: photo6, caption: 'Innocent eyes, rated R thoughts 👀' },
   { id: 4, src: photo4, caption: 'Together, we laugh a little louder and smile a lot bigger'},
  { id: 10, src: photo10, caption: 'You’re welcome for existing in your life 🫶' }, 
  { id: 14, src: photo14, caption: 'Couldnt have asked for a better partner-in-crime' },
  { id: 15, src: photo15, caption: 'The only person who’s ever carried me like this till now🥲' },
  { id: 19, src: photo19, caption: 'Lifes a lot brighter with you in it' },
    
];

// This is a component for a single Polaroid
const Polaroid = ({ photo }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="polaroid-container" onClick={() => setIsFlipped(!isFlipped)}>
      <div className={`polaroid-inner ${isFlipped ? 'is-flipped' : ''}`}>
        {/* Front of the card */}
        <div className="polaroid-front">
          <img src={photo.src} alt="Memory" className="polaroid-image" />
        </div>
        {/* Back of the card */}
        <div className="polaroid-back">
          <p className="polaroid-caption">{photo.caption}</p>
        </div>
      </div>
    </div>
  );
};


function PhotoGallery({ onComplete }) {
  // --- NEW: State and logic for the runaway button ---
  const [yesButtonPosition, setYesButtonPosition] = useState({ top: 0, left: 0 });
  const [yesCount, setYesCount] = useState(0);

  const handleYesHover = () => {
    if (yesCount < 5) {
      setYesCount(yesCount + 1);
      const newTop = Math.floor(Math.random() * 150) - 75;
      const newLeft = Math.floor(Math.random() * 200) - 100;
      setYesButtonPosition({ top: newTop, left: newLeft });
    }
  };

  return (
    <div className="gallery-container">
      <div className="gallery-header">
        <h1>Our Memory Book</h1>
        <p>Every photo holds a piece of us... dare to flip?</p>
      </div>
      <div className="gallery-grid">
        {photos.map(photo => (
          <Polaroid key={photo.id} photo={photo} />
        ))}
      </div>
      {/* --- NEW: The final runaway button gag --- */}
      <div className="gallery-footer">
        <div className="final-question">
            <h3>Do you want more…?</h3>
            {yesCount >= 3 && <p className="defeat-message"> Desperate much? Click No now, babe </p>}
            <div className="button-container">
              <button
                className={`yes-button ${yesCount >= 5 ? 'defeated' : ''}`}
                style={{ position: 'relative', top: `${yesButtonPosition.top}px`, left: `${yesButtonPosition.left}px` }}
                onMouseEnter={handleYesHover}
              >
                Yes
              </button>
              <button className="no-button" onClick={onComplete}>
                No
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

export default PhotoGallery;
