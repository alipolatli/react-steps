import React from "react";
import "./App.css";
import Logo from "./Logo";
import PackingList from "./PackingList";
import { IItem } from "./IItem";
import { Form } from "./Form";
import { Stats } from "./Stats";

const initialItems: Array<IItem> = [
  { id: "1", description: "Passports", quantity: 2, packed: false },
  { id: "2", description: "Socks", quantity: 12, packed: false },
  { id: "3", description: "Charger", quantity: 12, packed: false },
  { id: "4", description: "Toothbrush", quantity: 1, packed: false },
  { id: "5", description: "Phone", quantity: 1, packed: false },
  { id: "6", description: "Underwear", quantity: 6, packed: false },
  { id: "7", description: "Shirts", quantity: 5, packed: false },
  { id: "8", description: "Pants", quantity: 3, packed: false },
  { id: "9", description: "Toiletries", quantity: 1, packed: false },
  { id: "10", description: "Sunscreen", quantity: 1, packed: false },
  { id: "11", description: "Hat", quantity: 1, packed: false },
  { id: "12", description: "Swimsuit", quantity: 1, packed: false },
  { id: "13", description: "Towel", quantity: 1, packed: false },
  { id: "14", description: "Flip flops", quantity: 1, packed: false },
  { id: "15", description: "Water bottle", quantity: 1, packed: false },
];

export function generateId() {
  const date = new Date();
  return (
    date.getTime().toString(16) +
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      const r = (date.getTime() + Math.random() * 16) % 16 | 0;
      date.setTime(date.getTime() / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    })
  );
}

function App() {
  const [items, setItems] = React.useState<Array<IItem>>(initialItems);

  function handleAddSetItems(item: IItem): void {
    setItems(() => [...items, item]);
  }
  function handleDeleteSetItems(item: IItem): void {
    console.log(item);
    setItems(() => items.filter((i) => i.id !== item.id));
  }
  function handlePackedSetItems(item: IItem): void {
    console.log(item);
    setItems(
      items.map((i) => (i.id === item.id ? { ...i, packed: !i.packed } : i))
    );
    console.log(initialItems);
  }
  function handleClearSetItems(): void {
    setItems(new Array<IItem>());
    console.log(initialItems);
  }

  return (
    <div>
      <Logo></Logo>
      <Form onAddSetItems={handleAddSetItems}></Form>
      <PackingList
        items={items}
        onDeleteSetItems={handleDeleteSetItems}
        onPackedSetItems={handlePackedSetItems}
        onClearSetItems={handleClearSetItems}
      ></PackingList>
      <Stats items={items}></Stats>
    </div>
  );
}

export interface FormProps {
  onAddSetItems: (items: IItem) => void;
}
export interface StatsProps {
  items: Array<IItem>;
}
export default App;
