import React from 'react';
import './Toast.css';

const Toast = ({ message, type = 'error' }) => {
  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  );
};

export default Toast;
