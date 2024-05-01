import React from "react";
import "./App.css";

const initialItems: Array<IItem> = [
  { id: "1", description: "Passports", quantity: 2, packed: false },
  { id: "2", description: "Socks", quantity: 12, packed: false },
  { id: "3", description: "Charger", quantity: 12, packed: true },
];

function generateId() {
  const date = new Date();
  return date.getTime().toString(16) + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (date.getTime() + Math.random() * 16) % 16 | 0;
    date.setTime(date.getTime() / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

function App() {
  const [items, setItems] = React.useState<Array<IItem>>(initialItems);
  function handleAddSetItems(item : IItem) : void {
    setItems(() => [...items, item]);
  };
  function handleDeleteSetItems(item : IItem) : void {
    console.log(item);
    setItems(() => items.filter((i) => i.id !== item.id));
  };
  function handlePackedSetItems(item : IItem) : void {
    console.log(item);
    setItems(items.map((i) => i.id === item.id ? {...i, packed: !i.packed} : i));
    console.log(initialItems);
  };

  return (
    <div>
      <Logo></Logo>
      <Form onAddSetItems = {handleAddSetItems}></Form>
      <PackingList items={items} onDeleteSetItems={handleDeleteSetItems} onPackedSetItems={handlePackedSetItems}></PackingList>
      <Stats></Stats>
    </div>
  );
}


function Logo() {
  return <h1>Travel List</h1>;
}

interface FormProps {
  onAddSetItems: (items: IItem) => void; 
}
function Form({onAddSetItems} :FormProps ) {
  const [quantity, setQuantity] = React.useState<number>(1);
  const [description, setDescription] = React.useState<string>("");

  const optionsArray = [];
  for (let i = 1; i <= 20; i++) {
    optionsArray.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }

  function handleSubmit(e: React.FormEvent) : void {
    e.preventDefault();
    const item: IItem = new Item(generateId(), description, quantity, false);
    console.log(item);
    onAddSetItems(item);
    setDescription(() => "");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={(e) => handleSubmit(e)}>
      <h3>What do you need?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number.parseInt(e.target.value))}
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

interface PackingListProps {
  items: Array<IItem>;
  onDeleteSetItems: (items: IItem) => void; 
  onPackedSetItems: (items: IItem) => void; 
}
function PackingList({items, onDeleteSetItems,onPackedSetItems}: PackingListProps) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <li>
          <input type="checkbox" checked={item.packed}  onChange={(e) => {onPackedSetItems(item)}}/>
          <span style={item.packed ? { textDecoration: "line-through" } : {}}>
            {item.description} {item.quantity}
          </span>
          <button onClick={(e)=> onDeleteSetItems(item)}>❌</button>
        </li>
        ))}
      </ul>
    </div>
  );
}




function Stats() {
  return <footer className="stats">Have X item in list. Already X.</footer>;
}

interface IItem {
  id: string;
  description: string;
  quantity: number;
  packed: boolean;
}

class Item implements IItem {
  constructor(
    public id: string,
    public description: string,
    public quantity: number,
    public packed: boolean
  ) {}
}



export default App;
