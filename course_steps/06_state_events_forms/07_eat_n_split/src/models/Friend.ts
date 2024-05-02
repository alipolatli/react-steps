export interface IFriend{
    id: number;
    name: string;
    image: string;
    balance: number;
}

export class Friend implements IFriend{
    id: number;
    name: string;
    image: string;
    balance: number;
    constructor(id: number, name: string, image: string , balance: number){
        this.id = id;
        this.name = name;
        this.image = image;
        this.balance = balance;
    }
} 