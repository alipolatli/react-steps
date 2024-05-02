import React from "react";
import { StatsProps } from "./App";

export function Stats({ items }: StatsProps) {
  return (
    <footer className="stats">
      {items.length !== items.filter((i) => i.packed).length
        ? `Have ${items.length} item in list. Already ${items.filter((i) => i.packed).length} packed.`
        : items.length !== 0 ? "All items packed." : "No item."}
    </footer>
  );
}
