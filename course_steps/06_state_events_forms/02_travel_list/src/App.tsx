import React from "react";
import "./App.css";

const initialItems: Array<IItem> = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 12, packed: true },
];

function App() {
  return (
    <div>
      <Logo></Logo>
      <Form></Form>
      <PackingList></PackingList>
      <Stats></Stats>
    </div>
  );
}

function Logo() {
  return <h1>Travel List</h1>;
}

function Form() {
  const [count, setCount] = React.useState<number>(1);
  const [description, setDescription] = React.useState<string>("");

  const optionsArray = [];
  for (let i = 1; i <= 20; i++) {
    optionsArray.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(description);
    console.log(count);
    const item : IItem = new Item(4,description,count,true);
  }

  return (
    <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
      <h3>What do you need?</h3>
      <select
        value={count}
        onChange={(e) => setCount(Number.parseInt(e.target.value))}
      >
        {optionsArray}
      </select>
      <input
        type="text"
        placeholder="Item.."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((item) => (
          <PackingItem key={item.id} itemObj={item}></PackingItem>
        ))}
      </ul>
    </div>
  );
}

function PackingItem({ itemObj }: IItemProps) {
  return (
    <li>
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
        {itemObj.description} {itemObj.quantity}
      </span>
      <button>❌</button>
    </li>
  );
}

function Stats() {
  return <footer className="stats">Have X item in list. Already X.</footer>;
}

interface IItem {
  id: number;
  description: string;
  quantity: number;
  packed: boolean;
}

class Item implements IItem {
  constructor(
    public id: number,
    public description: string,
    public quantity: number,
    public packed: boolean
  ) {}
}

interface IItemProps {
  itemObj: IItem;
}

export default App;
