import React, { useState } from "react";
import "./App.css";

interface Question {
  id: number;
  question: string;
  answer: string;
}

const questions: Question[] = [
  {
    id: 3457,
    question: "What language is React based on?",
    answer: "JavaScript",
  },
  {
    id: 7336,
    question: "What are the building blocks of React apps?",
    answer: "Components",
  },
  {
    id: 8832,
    question: "What's the name of the syntax we use to describe a UI in React?",
    answer: "JSX",
  },
  {
    id: 1297,
    question: "How to pass data from parent to child components?",
    answer: "Props",
  },
  {
    id: 9103,
    question: "How to give components memory?",
    answer: "useState hook",
  },
  {
    id: 2002,
    question:
      "What do we call an input element that is completely synchronized with state?",
    answer: "Controlled element",
  },
];

function App() {
  return (
    <div className="App">
      <FlashCards questions={questions} />
    </div>
  );
}

interface FlashCardsProps {
  questions: Question[];
}

function FlashCards({ questions }: FlashCardsProps) {
  const [selectedId, setSelectedId] = React.useState<number>(-1);

  return (
    <div className="flashcards">
      {questions.map((q) => (
        <div
          key={q.id}
          className={q.id === selectedId ? "selected" : ""}
          onClick={() => setSelectedId((id) => (id === q.id ? -1 : q.id))}
        >
          <p>{q.id === selectedId ? q.answer : q.question}</p>
        </div>
      ))}
    </div>
  );
}



export default App;
