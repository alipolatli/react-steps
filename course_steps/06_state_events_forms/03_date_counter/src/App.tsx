import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Counter></Counter>
    </div>
  );
}


function Counter(){
  const [step, setStep] = React.useState<number>(0);
  const [count, setCount] = React.useState<number>(0);

  return (
    <React.Fragment>
      <button onClick={() => setStep((s) => s-1)}>➖</button>
      <p>Step: {step}</p>
      <button onClick={() => setStep((s) => s+1)}>➕</button>
      <br></br>
      <button onClick={() => setCount((c) =>  c- step)}>➖</button>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + step)}>➕</button>
      <br></br>
    </React.Fragment>
    
  )



}

export default App;