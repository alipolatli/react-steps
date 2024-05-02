import React from "react";
import "./App.css";

const messages: Array<string> = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

interface IButtonProps{
  onClick: () => void;
  children: React.ReactNode;
}
function Button(buttonProps: IButtonProps):React.JSX.Element{
  return(
    <button onClick={() => buttonProps.onClick()} style={{backgroundColor:"peru"}}>
      {buttonProps.children}
    </button>
  )
}

function App() {
  const [step, setStep] = React.useState<number>(1);
  const [isOpen, setIsOpen] = React.useState<boolean>(true);

  function handlePrevious(): void {
    if (step > 1) {
      setStep((s)=> s-1);
    }
  }

  function handleNext(): void {
    if (step < 3) {
      setStep((s)=> s+1);
    }
  }

  return (
    <React.Fragment>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>{isOpen ? '✖️' : '✔️'} </button>
      {isOpen &&
       <div className="steps">
       <div className="numbers">
         <div className={`${step === 1 ? "active" : ""}`}>1</div>
         <div className={`${step === 2 ? "active" : ""}`}>2</div>
         <div className={`${step === 3 ? "active" : ""}`}>3</div>
       </div>
       <div className="message">
         Step {step} : {messages[step - 1]}{" "}
       </div>
       <div className="buttons">
         <button
           style={{ backgroundColor: "peru" }}
           onClick={(e) => handlePrevious()}
         >
           Previous
         </button>
         <Button onClick={handleNext}>Next</Button>
         {/* <button
           style={{ backgroundColor: "peru" }}
           onClick={() => handleNext()}
         >
           Next
         </button> */}
       </div>
     </div>
    }
     </React.Fragment>
     
  );
}



export default App;
