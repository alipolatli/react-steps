import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Counter></Counter>
    </div>
  );
}

function Counter() {
  const [step, setStep] = React.useState<number>(1);
  const [count, setCount] = React.useState<number>(0);

  function handleReset(){
    setStep(1);
    setCount(0);
  }

  const date: Date = new Date();
  date.setDate(date.getDate() + count);

  return (
    <React.Fragment>
      <input type="range" value={step} onChange={(e) => setStep(Number.parseInt(e.target.value))}></input>
      <span>{step}</span>
      {/* <button onClick={() => setStep((s) => s - 1)}>➖</button>
      <p>Step: {step}</p>
      <button onClick={() => setStep((s) => s + 1)}>➕</button> */}
      <br></br>
      <button onClick={() => setCount((c) => c - step)}>➖</button>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + step)}>➕</button>
      <br></br>
      <p>
        <span>
          {count === 0
            ? "Today is "
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </p>
      <button onClick={() => handleReset()} >Reset</button>
    </React.Fragment>
  );
}

export default App;
