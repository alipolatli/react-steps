import React from "react";
import "./App.css";
import { IFriend, Friend } from "./models/Friend";

const initialFriends: Array<IFriend> = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = React.useState<Array<IFriend>>(initialFriends);
  const [showAddBalanceFriendForm, setShowAddBalanceFriendForm] =
    React.useState<boolean>(false);
  const [selectedFriend, setSelectedFriend] = React.useState<IFriend | null>(
    null
  );

  function handleSetFriends(friend: IFriend): void {
    setFriends([...friends, friend]);
    setShowAddBalanceFriendForm(false);
  }

  function handleSelectFriend(friend: IFriend): void {
    setSelectedFriend((curr) => (curr?.id === friend.id ? null : friend));
  }

  function handleSplitBill(value: number) {
    if (selectedFriend) {
      const newBalance = selectedFriend.balance + value;
      setSelectedFriend(new Friend(selectedFriend.id, selectedFriend.name, selectedFriend.image, newBalance));
    }
  }

  return (
    <div className="app">
      <div className="sidebar">
        <BalanceFriends
          onSelectedFriend={handleSelectFriend}
          friends={friends}
          selectedFriendId={selectedFriend?.id ?? null}
        ></BalanceFriends>
        <button
          onClick={() => setShowAddBalanceFriendForm(!showAddBalanceFriendForm)}
          className="button"
        >
          {" "}
          {!showAddBalanceFriendForm ? "Add New Balance Friend" : "Close"}{" "}
        </button>
        {showAddBalanceFriendForm && (
          <FormAddBalanceFriend onAddFriend={(f) => handleSetFriends(f)} />
        )}
      </div>
      {selectedFriend && (
        <FormSplitBill
          friend={selectedFriend}
          onSplitBill={handleSplitBill}
        ></FormSplitBill>
      )}
    </div>
  );
}

interface IBalanceFriendsProps {
  friends: Array<IFriend>;
  onSelectedFriend: (friend: IFriend) => void;
  selectedFriendId: number | null;
}
function BalanceFriends({
  friends,
  onSelectedFriend,
  selectedFriendId,
}: IBalanceFriendsProps) {
  return (
    <ul>
      {friends.map((friend) => (
        <BalanceFriend
          onSelectedFriend={() => onSelectedFriend(friend)}
          key={friend.id}
          friend={friend}
          selectedFriendId={selectedFriendId}
        ></BalanceFriend>
      ))}
    </ul>
  );
}

interface IBalanceFriendProps {
  friend: IFriend;
  onSelectedFriend: (friend: IFriend) => void;
  selectedFriendId: number | null;
}
function BalanceFriend({
  friend,
  onSelectedFriend,
  selectedFriendId,
}: IBalanceFriendProps) {
  const balanceColorClass =
    friend.balance < 0 ? "red" : friend.balance === 0 ? "black" : "green";
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      <p className={balanceColorClass}>${friend.balance}</p>
      <button className="button" onClick={() => onSelectedFriend(friend)}>
        {selectedFriendId === friend.id ? "Close" : "Select"}
      </button>
    </li>
  );
}

interface IFormAddBalanceFriendProps {
  onAddFriend: (friend: IFriend) => void;
}
function FormAddBalanceFriend({ onAddFriend }: IFormAddBalanceFriendProps) {
  const [name, setName] = React.useState<string>("");
  const [image, setImage] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newFriend: IFriend = new Friend(534, name, image, 0);
    onAddFriend(newFriend);
    setName("");
  };

  return (
    <form className="form-add-friend" onSubmit={(e) => handleSubmit(e)}>
      <label>😊Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>😊Image:</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button className="button" type="submit">
        Add Friend
      </button>
    </form>
  );
}
interface IFormSplitBillProps {
  friend: IFriend;
  onSplitBill: (value: number) => void;
}
function FormSplitBill({ friend, onSplitBill }: IFormSplitBillProps) {
  const [bill, setBill] = React.useState<number>();
  const [yourExpense, setYourExpense] = React.useState<number>(0);
  const [friendExpense, setFriendExpense] = React.useState<number>(0);
  const [whoPaying, setWhoPaying] = React.useState<number>(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSplitBill(whoPaying === 1 ? friendExpense : -yourExpense);
  };
  return (
    <form className="form-split-bill" onSubmit={(e) => handleSubmit(e)}>
      <h2>Split a bill with {friend.name}</h2>
      <label>😊Bill Value:</label>
      <input
        onChange={(e) => setBill(parseInt(e.target.value))}
        value={bill}
        type="number"
      />
      <label>😊Your Expense:</label>
      <input
        onChange={(e) => setYourExpense(parseInt(e.target.value))}
        value={yourExpense}
        type="number"
      />
      <label>😊{friend.name} Expense:</label>
      <input
        onChange={(e) => setFriendExpense(parseInt(e.target.value))}
        value={friendExpense}
        type="number"
      />
      <label>😊Who is paying the bill</label>
      <select
        value={whoPaying}
        onChange={(e) => setWhoPaying(Number(e.target.value))}
      >
        <option value={1}>You</option>
        <option value={2}>X</option>
      </select>
      <button className="button" type="submit">
        Spilt Bill
      </button>
    </form>
  );
}
export default App;
