import React from 'react';

function ResultDisplay({ result }) {
  return (
    <div>
      {result !== null && (
        <h2>Result: {result}</h2>
      )}
    </div>
  );
}

export default ResultDisplay;
