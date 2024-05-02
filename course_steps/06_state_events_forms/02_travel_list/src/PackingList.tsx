import React from "react";
import { IItem } from "./IItem";

  export default function PackingList({
    items,
    onDeleteSetItems,
    onPackedSetItems,
    onClearSetItems,
  }: PackingListProps) {
    const [sortBy, setSortBy] = React.useState<string>("input");
  
    items.sort((a, b) => {
      if (sortBy === "input") {
        return a.id.localeCompare(b.id);
      }
      else if (sortBy === "description") {
        return b.description.localeCompare(a.description);
      }
      else {
        return Number(b.packed) - Number(a.packed);
      }
    });
  
    return (
      <div className="list">
        <ul>
          {items.map((item) => (
            <li>
              <input
                type="checkbox"
                checked={item.packed}
                onChange={(e) => {
                  onPackedSetItems(item);
                }}
              />
              <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.description} {item.quantity}
              </span>
              <button onClick={(e) => onDeleteSetItems(item)}>🗑️</button>
            </li>
          ))}
        </ul>
        <div className="actions">
          <select
            value={sortBy}
            onChange={(e) => setSortBy((sortBy) => (sortBy = e.target.value))}
          >
            <option value="input">Input Order</option>
            <option value={"description"}>Description</option>
            <option value={"packed"}>Packed</option>
          </select>
          <button onClick={() => onClearSetItems()}>Clear All</button>
        </div>
      </div>
    );
  }
  
  interface PackingListProps {
    items: Array<IItem>;
    onDeleteSetItems: (items: IItem) => void;
    onPackedSetItems: (items: IItem) => void;
    onClearSetItems: () => void;
  }