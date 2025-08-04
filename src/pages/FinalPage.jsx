// src/pages/FinalPage.jsx
import React from 'react';
import Confetti from 'react-confetti';

// A simple function to get the window size
function useWindowSize() {
  const [size, setSize] = React.useState([window.innerWidth, window.innerHeight]);
  React.useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return size;
}

function FinalPage() {
  const [width, height] = useWindowSize();

  return (
    <div className="final-container">
      <Confetti
        width={width}
        height={height}
        recycle={true}
        numberOfPieces={150}
        colors={['#f9a8d4', '#ec4899', '#f472b6', '#fff']}
      />
      <div className="final-content">
        {/* UPDATED: Text structure and hierarchy */}
        <h2>You're Officially Old Now</h2>
        <p>Just kidding, the best is yet to come.</p>
        <h1>Happy Birthday Bebe</h1>
        <p className="little-subheadline"> Cry Less , Smile More .</p>
        <span>&lt;3</span>
      </div>
    </div>
  );
}

export default FinalPage;
