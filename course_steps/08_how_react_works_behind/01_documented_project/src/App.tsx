import { useState } from "react";

interface IContentItem {
  summary: string;
  details: string;
}

const contents: Array<IContentItem> = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function App() {
  return (
    <div>
      <Tabbed contents={contents} />
    </div>
  );
}

interface ITabbedProps {
  contents: IContentItem[];
}
function Tabbed({ contents }: ITabbedProps) {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <div>
      <div className="tabs">
        {contents.map((_, index) => (
          <>
            <Tab key={index} index={index} activeTab={activeTab} onTabClick={() => setActiveTab(index)} />
          </>
        ))}
        <Tab index={3} activeTab={activeTab} onTabClick={() => setActiveTab(3)} />
      </div>
      {activeTab <= 2 ? (
        <TabContent key={contents[activeTab].summary} item={contents[activeTab]} />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

interface ITabProps {
  index: number;
  activeTab: number;
  onTabClick: (num: number) => void;
}
function Tab({ index, activeTab, onTabClick }: ITabProps) {
  return (
    <button
      className={activeTab === index ? "tab active" : "tab"}
      onClick={() => onTabClick(index)}
    >
      Tab {index }
    </button>
  );
}

interface ITabContentProps {
  item: IContentItem;
}

function TabContent({ item }: ITabContentProps) {
  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [likes, setLikes] = useState<number>(0);

  function handleInc() {
    setLikes(likes + 1);
  }

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setShowDetails((h) => !h)}>
          {showDetails ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={() => setLikes( likes +1) }>+</button>
          <button>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}
