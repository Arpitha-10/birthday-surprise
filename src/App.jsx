// src/App.jsx
import React, { useState } from 'react';
import LandingPage from './pages/LandingPage.jsx';
import BirthdayPage from './pages/BirthdayPage.jsx';
import CakePage from './pages/CakePage.jsx';
import PhotoGallery from './pages/PhotoGallery.jsx';
import FinalPage from './pages/FinalPage.jsx';
import SparkleCursor from './pages/SparkleCursor.jsx'; // 1. Import the new component

function App() {
  const [step, setStep] = useState('landing');

  const handleLandingComplete = () => { setStep('birthday'); };
  const handleCelebrate = () => { setStep('cake'); };
  const handleCakeComplete = () => { setStep('gallery'); };
  const handleGalleryComplete = () => { setStep('final'); };

  return (
    <div className="app-container">
      <SparkleCursor /> {/* 2. Add the sparkle cursor here to make it appear everywhere */}
      
      {step === 'landing' && <LandingPage onComplete={handleLandingComplete} />}
      {step === 'birthday' && <BirthdayPage onCelebrateClick={handleCelebrate} />}
      {step === 'cake' && <CakePage onComplete={handleCakeComplete} />}
      {step === 'gallery' && <PhotoGallery onComplete={handleGalleryComplete} />}
      {step === 'final' && <FinalPage />}
    </div>
  );
}

export default App;
