import React, { useState, useEffect } from "react";

const API_URL = (amount: number | string, to: string) =>
  `https://api.frankfurter.app/latest?amount=${amount}&from=USD&to=${to}`;

interface ExchangeRates {
  rates: {
    [key: string]: number;
  };
}

const useExchangeRates = (value: number | string, currency: string) => {
  const [output, setOutput] = useState<string>("");

  useEffect(() => {
    const controller= new AbortController();
    const fetchRates = async () => {
      try {
        const response = await fetch(API_URL(value, currency),
      { signal: controller.signal }
    );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: ExchangeRates = await response.json();
        const convertedValue = data.rates[currency];
        setOutput(`${convertedValue.toFixed(2)} ${currency}`);
      } catch (error) {
        console.error("Error fetching exchange rates:", error);
        setOutput("Error fetching data");
      }
    };

    fetchRates();

    return function(){
      controller.abort();
    }
  }, [value, currency]);

  return output;
};

const App: React.FC = () => {
  const [value, setValue] = useState<number | string>(1);
  const [currency, setCurrency] = useState<string>("EUR");

  const output = useExchangeRates(value, currency);

  return (
    <div className="App">
      <label>
        Amount in USD:
        <input
          type="number"
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />
      </label>
      <label>
        Convert to:
        <select
          value={currency}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setCurrency(e.target.value)
          }
        >
          <option value="EUR">EUR</option>
          <option value="RUB">RUB</option>
          <option value="USD">USD</option>
        </select>
      </label>
      <p>Output: {output}</p>
    </div>
  );
};

export default App;
