import React, { useState } from 'react';
import CalculatorInput from './components/CalculatorInput';
import ResultDisplay from './components/ResultDisplay';
import './App.css'; 

function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operator, setOperator] = useState('');
  const [result, setResult] = useState(null);

  // Handler function to update state from child components
  const handleInputChange = (e, type) => {
    const value = e.target.value;
    if (type === 'num1') setNum1(value);
    else if (type === 'num2') setNum2(value);
    else if (type === 'operator') setOperator(value);
  };

  // Function to perform calculation based on operator
  const handleCalculation = () => {
    let calcResult;
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    if (isNaN(n1) || isNaN(n2)) {
      alert('Please enter valid numbers');
      return;
    }

    switch (operator) {
      case '+':
        calcResult = n1 + n2;
        break;
      case '-':
        calcResult = n1 - n2;
        break;
      case '*':
        calcResult = n1 * n2;
        break;
      case '/':
        if (n2 === 0) {
          alert('Cannot divide by zero');
          return;
        }
        calcResult = n1 / n2;
        break;
      default:
        alert('Please select a valid operator');
        return;
    }

    setResult(calcResult);
  };

  // Function to reset all fields and results
  const handleReset = () => {
    setNum1('');
    setNum2('');
    setOperator('');
    setResult(null);
  };

  return (
    <div className="App">
      <h1>Basic Calculator</h1>
      <CalculatorInput
        num1={num1}
        num2={num2}
        operator={operator}
        onInputChange={handleInputChange}
        onCalculate={handleCalculation}
      />
      <ResultDisplay result={result} />
      
      {}
      <button className="reset-button" onClick={handleReset}>Reset</button>
    </div>
  );
}

export default App;
