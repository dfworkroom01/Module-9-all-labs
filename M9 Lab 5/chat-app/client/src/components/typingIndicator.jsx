import React from 'react';

const TypingIndicator = ({ message }) => {
  return (
    <div className="typing-indicator">
      {message && <span>{message}</span>}
    </div>
  );
};

export default TypingIndicator;
