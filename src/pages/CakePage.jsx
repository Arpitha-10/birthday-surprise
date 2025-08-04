// src/pages/CakePage.jsx
import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';

// A simple function to get the window size
function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);
  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}

// A function to draw a heart shape for the confetti
const drawHeart = (ctx) => {
  ctx.beginPath();
  ctx.moveTo(0, -5);
  ctx.bezierCurveTo(0, -8, -4, -15, -12, -15);
  ctx.bezierCurveTo(-22, -15, -22, -2, -12, 5);
  ctx.bezierCurveTo(-2, 15, 0, 8, 0, 5);
  ctx.fill();
  ctx.closePath();
};

const TOTAL_CANDLES = 5;

// --- SVG components for each part of the cake ---
const Plate = () => ( <g className="cake-part"><ellipse cx="200" cy="280" rx="180" ry="20" fill="#e2e8f0" /><ellipse cx="200" cy="275" rx="175" ry="18" fill="#f1f5f9" /></g> );
const CakeLayer1 = () => ( <g className="cake-part"><ellipse cx="200" cy="250" rx="150" ry="40" fill="url(#cakeGradient1)" /><rect x="50" y="170" width="300" height="80" fill="url(#cakeGradient1)" /><ellipse cx="200" cy="170" rx="150" ry="40" fill="#701a75" /></g> );
const CakeLayer2 = () => ( <g className="cake-part"><ellipse cx="200" cy="170" rx="140" ry="35" fill="url(#cakeGradient2)" /><rect x="60" y="100" width="280" height="70" fill="url(#cakeGradient2)" /><ellipse cx="200" cy="100" rx="140" ry="35" fill="#be185d" /></g> );
const Icing = () => ( <g className="cake-part"><ellipse cx="200" cy="100" rx="150" ry="45" fill="url(#frostingGradient)" /><circle cx="100" cy="120" r="20" fill="url(#frostingGradient)" /><circle cx="150" cy="130" r="25" fill="url(#frostingGradient)" /><circle cx="210" cy="135" r="30" fill="url(#frostingGradient)" /><circle cx="280" cy="125" r="22" fill="url(#frostingGradient)" /></g> );


function CakePage({ onComplete }) {
  const [animationStep, setAnimationStep] = useState(0);
  const [candlesLit, setCandlesLit] = useState(Array(TOTAL_CANDLES).fill(true));
  const [topMessage, setTopMessage] = useState("Let's make a cake...");
  const [showHeartConfetti, setShowHeartConfetti] = useState(true);
  const [showGoldenConfetti, setShowGoldenConfetti] = useState(false);
  const [showTourButton, setShowTourButton] = useState(false);
  const [width, height] = useWindowSize();
  const [synth, setSynth] = useState(null);

  // Load Tone.js and create the synth
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js";
    script.onload = () => {
      const polySynth = new window.Tone.PolySynth().toDestination();
      setSynth(polySynth);

      // Play "Happy Birthday" tune when the page loads
      const melodySynth = new window.Tone.Synth({
        oscillator: { type: 'sine' },
        envelope: { attack: 0.005, decay: 0.1, sustain: 0.3, release: 1 }
      }).toDestination();

      const melody = [
        { time: '0:0', note: 'G4', duration: '8n' }, { time: '0:0:2', note: 'G4', duration: '8n' },
        { time: '0:1', note: 'A4', duration: '4n' }, { time: '0:2', note: 'G4', duration: '4n' },
        { time: '0:3', note: 'C5', duration: '4n' }, { time: '1:0', note: 'B4', duration: '2n' },
        { time: '1:2', note: 'G4', duration: '8n' }, { time: '1:2:2', note: 'G4', duration: '8n' },
        { time: '1:3', note: 'A4', duration: '4n' }, { time: '2:0', note: 'G4', duration: '4n' },
        { time: '2:1', note: 'D5', duration: '4n' }, { time: '2:2', note: 'C5', duration: '2n' }
      ];

      // Create a Tone.Part to play the melody
      const part = new window.Tone.Part((time, value) => {
        melodySynth.triggerAttackRelease(value.note, value.duration, time);
      }, melody);
      
      // Set the part to loop
      part.loop = true;
      // FIXED: Loop every 3 measures for continuous play
      part.loopEnd = '3m'; 
      part.start(0);
      
      window.Tone.start().then(() => {
        window.Tone.Transport.start();
      });
    };
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
      if (window.Tone) {
        window.Tone.Transport.stop();
        window.Tone.Transport.cancel();
      }
    };
  }, []);

  // Timer for the initial "Let's make a cake..." message
  useEffect(() => {
    const timer = setTimeout(() => {
      if (topMessage === "Let's make a cake...") {
        setTopMessage('');
      }
    }, 3000); // Disappears after 3 seconds
    return () => clearTimeout(timer);
  }, [topMessage]);

  // Controls the cake assembly and subsequent messages
  useEffect(() => {
    if (animationStep < 5) {
      const timer = setTimeout(() => {
        setAnimationStep(animationStep + 1);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (animationStep === 5) {
      const messageTimer = setTimeout(() => {
        setTopMessage("Blow out the candles...");
        const fadeOutTimer = setTimeout(() => {
          setTopMessage('');
        }, 3000); // Disappears after 3 seconds
        return () => clearTimeout(fadeOutTimer);
      }, 500); // Appears shortly after candles
      return () => clearTimeout(messageTimer);
    }
  }, [animationStep]);

  const handleCandleClick = (index) => {
    if (synth) synth.triggerAttackRelease("C3", "8n");
    const newCandlesState = [...candlesLit];
    newCandlesState[index] = false;
    setCandlesLit(newCandlesState);

    const allCandlesOut = newCandlesState.every(lit => !lit);
    if (allCandlesOut) {
      setTopMessage('Make a biggg wish...(hint:BD,BM)');
      setTimeout(() => {
        
        setTopMessage('Happy Birthday, Cinderella!👑');
        setShowHeartConfetti(false);
        setShowGoldenConfetti(true);
        setTimeout(() => setShowTourButton(true), 1500);
      }, 4000); // "Make a wish..." shows for 2 seconds
    }
  };

  return (
    <div className="cake-container">
      {showHeartConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={true}
          numberOfPieces={50}
          colors={['#ff477e']}
          gravity={0.07} // Slower fall
          drawShape={drawHeart}
          onConfettiComplete={() => setShowHeartConfetti(false)}
        />
      )}
      
      {showGoldenConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={true}
          numberOfPieces={250} // More particles for a bigger blast
          colors={['#fef3c7', '#fde047', '#f59e0b']}
          gravity={0.3} // Faster fall
        />
      )}

      <div className="instructions-top">
        <p key={topMessage} className="gradient-text top-message-animation">
          {topMessage}
        </p>
      </div>

      <div className="cake-svg-container">
        <svg viewBox="0 0 400 300" className="cake-svg">
          <defs>
            <linearGradient id="frostingGradient" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style={{ stopColor: '#fff1f2', stopOpacity: 1 }} /><stop offset="100%" style={{ stopColor: '#fde7f3', stopOpacity: 1 }} /></linearGradient>
            <linearGradient id="cakeGradient1" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style={{ stopColor: '#db2777', stopOpacity: 1 }} /><stop offset="100%" style={{ stopColor: '#be185d', stopOpacity: 1 }} /></linearGradient>
            <linearGradient id="cakeGradient2" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" style={{ stopColor: '#f472b6', stopOpacity: 1 }} /><stop offset="100%" style={{ stopColor: '#ec4899', stopOpacity: 1 }} /></linearGradient>
          </defs>
          
          {animationStep > 0 && <Plate />}
          {animationStep > 1 && <CakeLayer1 />}
          {animationStep > 2 && <CakeLayer2 />}
          {animationStep > 3 && <Icing />}
        </svg>

        {animationStep > 4 && (
          <div className="candles-container">
            {candlesLit.map((lit, index) => (
              <div key={index} className="candle">
                <div className="wick"></div>
                {lit && <div className="flame" onClick={() => handleCandleClick(index)}></div>}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="instructions-bottom">
        {showTourButton && (
          <button className="tour-button" onClick={onComplete}>
            Craving more?
          </button>
        )}
      </div>
    </div>
  );
}

export default CakePage;
