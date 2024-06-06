import React, { useState, ChangeEvent, useReducer } from "react";



function reducer(state: number, action: {step: number, type: string}): number {
  console.log(state,action);
  switch (action.type) {
    case 'increment':
      return state + action.step;
    case 'decrement':
      return state - action.step;
    case 'reset':
      return 1;
    case 'set':
      return action.step;
  }
  return state + action.step;
  }

  function DateCounter(): JSX.Element {
  const [count, dispatch] = useReducer(reducer, 0);
  const [step, setStep] = useState<number>(0);

  const date = new Date();
  date.setDate(date.getDate() + count);

  const dec = () => {
    dispatch( {step:step, type: "decrement"});
  };

  const inc = () => {
    dispatch( {step:step, type: "increment"});
  };

  const defineCount = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch( {step:step, type: "set"});
  };

  const defineStep = (e: ChangeEvent<HTMLInputElement>) => {
    setStep(Number(e.target.value));
  };

  const reset = () => {
    dispatch( {step:step, type: "set"});
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}

export default DateCounter;
