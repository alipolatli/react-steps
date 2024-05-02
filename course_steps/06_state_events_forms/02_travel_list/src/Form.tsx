import React from "react";
import { IItem } from "./IItem";
import { Item } from "./IItem";
import { FormProps, generateId } from "./App";

export function Form({ onAddSetItems }: FormProps) {
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

  function handleSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (description === "") {
      window.alert("Cannot be add empty.");
      return;
    }
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
        onChange={(e) => setDescription(e.target.value)} />
      <button>Add</button>
    </form>
  );
}
