import React, { useState } from "react";

export default function App() {
  return (
    <div>
      <TipCalculator />
    </div>
  );
}

function TipCalculator() {
  const [bill, setBill] = useState<number>(0);
  const [percentage1, setPercentage1] = useState<number>(0);
  const [percentage2, setPercentage2] = useState<number>(0);

  const tip = bill * ((percentage1 + percentage2) / 2 / 100);

  function handleReset() {
    setBill(0);
    setPercentage1(0);
    setPercentage2(0);
  }
  return (
    <div>
      <BillInput bill={bill} onSetBill={setBill} />
      <SelectPercentage percentage={percentage1} onSelect={setPercentage1}>
        How did you like the service?
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} onSelect={setPercentage2}>
        How did your friend like the service?
      </SelectPercentage>

      {bill > 0 && (
        <React.Fragment>
          <Output bill={bill} tip={tip} />
          <Reset onReset={handleReset} />
        </React.Fragment>
      )}
    </div>
  );
}

interface BillInputProps {
  bill: number;
  onSetBill: (value: number) => void;
}
function BillInput({ bill, onSetBill }: BillInputProps) {
  return (
    <div>
      <label>How much was the bill?</label>
      <input
        type="text"
        placeholder="Bill value"
        value={bill}
        onChange={(e) => onSetBill(Number(e.target.value))}
      />
    </div>
  );
}

interface SelectPercentageProps {
  children: React.ReactNode;
  percentage: number;
  onSelect: (value: number) => void;
}

function SelectPercentage({ children, percentage, onSelect }: SelectPercentageProps) {
  return (
    <div>
      <label>{children}</label>
      <select
        value={percentage}
        onChange={(e) => onSelect(Number(e.target.value))}
      >
        <option value={0}>Dissatisfied (0%)</option>
        <option value={5}>It was okay (5%)</option>
        <option value={10}>It was good (10%)</option>
        <option value={20}>Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

interface OutputProps {
  bill: number;
  tip: number;
}
function Output({ bill, tip }: OutputProps) {
  return (
    <h3>
      You pay ${bill + tip} (${bill} + ${tip} tip)
    </h3>
  );
}

interface ResetProps {
  onReset: () => void;
}
function Reset({ onReset }: ResetProps) {
  return <button onClick={onReset}>Reset</button>;
}
