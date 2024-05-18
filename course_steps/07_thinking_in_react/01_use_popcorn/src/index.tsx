import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./components/StarRating";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Test></Test>
  </React.StrictMode>
);

function Test() {
  const [rate, setRate] = React.useState<number>(0);
  
  function handleRate(r: number) {
    setRate(r);
  }

  return (
    <StarRating
      size={24}
      emptyColor="white"
      fillColor="yellow"
      maxRating={10}
      onSetRating={(r) => handleRate(r)}
    ></StarRating>
  );
}
