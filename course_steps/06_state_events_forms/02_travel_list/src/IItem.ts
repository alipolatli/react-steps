export interface IItem {
    id: string;
    description: string;
    quantity: number;
    packed: boolean;
  }

export class Item implements IItem {
    constructor(
      public id: string,
      public description: string,
      public quantity: number,
      public packed: boolean
    ) { }
  }
  