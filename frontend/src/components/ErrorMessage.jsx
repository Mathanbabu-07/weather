import React from 'react';
import { AlertTriangle } from 'lucide-react';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  return (
    <div className="error-container">
      <AlertTriangle className="error-icon" size={20} />
      <span className="error-text">{message}</span>
    </div>
  );
};

export default ErrorMessage;
