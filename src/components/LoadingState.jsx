import React from 'react';
import './LoadingState.css';

const LoadingState = () => {
  return (
    <div className="loading-state">
      <div className="loading-spinner">
        <div className="pulse-dot"></div>
      </div>
      <p className="loading-text">Analyzing your lecture…</p>
    </div>
  );
};

export default LoadingState;
