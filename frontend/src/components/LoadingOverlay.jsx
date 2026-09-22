import React from 'react';

const LoadingOverlay = ({ isVisible, message = "Advera Engine Executing..." }) => {
  if (!isVisible) return null;

  return (
    <div className="loading-overlay">
      <div className="logo-container">
        <div className="logo-glow"></div>
        <img src="/advera-logo.png" alt="Advera" className="logo-main" />
      </div>
      <div className="loading-text">{message}</div>
      <div style={{ marginTop: '24px', width: '200px', height: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '1px', overflow: 'hidden' }}>
        <div style={{ 
          height: '100%', 
          background: 'var(--primary)', 
          width: '30%', 
          animation: 'slide 1.5s infinite ease-in-out' 
        }}></div>
      </div>
      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingOverlay;
