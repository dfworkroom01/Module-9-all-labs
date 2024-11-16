import React from 'react';

function CalculatorInput({ num1, num2, operator, onInputChange, onCalculate }) {
  return (
    <div>
      <input
        type="number"
        value={num1}
        onChange={(e) => onInputChange(e, 'num1')}
        placeholder="Enter first number"
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => onInputChange(e, 'num2')}
        placeholder="Enter second number"
      />
      <select
        value={operator}
        onChange={(e) => onInputChange(e, 'operator')}
      >
        <option value="">Function</option>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="*">*</option>
        <option value="/">/</option>
      </select>
      <button onClick={onCalculate}>Calculate</button>
    </div>
  );
}

export default CalculatorInput;
