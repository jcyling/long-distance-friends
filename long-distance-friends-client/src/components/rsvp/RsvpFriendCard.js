import React, { useEffect, useState } from "react";

const RsvpFriendCard = ({ booked, friend, handleFriendPick, activeFriend }) => {

  const [active, setActive] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (booked === true) {
      setDisabled(true);
    }
  }, []);

  useEffect(() => {
    if (activeFriend) {
      return (activeFriend.name === friend.name) ? setActive(true) : setActive(false);
    }
  }, [activeFriend]);

  if (disabled) {
    return (
      <div
        className="m-6 flex flex-col items-center">
        <div className={"bg-gray-500 w-24 h-24 rounded-full"}></div>
        <div>{friend.name}</div>
        <div className="flex flex-col text-sm">
          <span>{friend.timezone}</span>
          <span>Slots booked</span>
        </div>
      </div>
    );
  }
  else {
    return (
      <div
        className="m-6 flex flex-col items-center cursor-pointer"
        onClick={() => handleFriendPick(friend)}>
        <div className={`bg-gray-300 w-24 h-24 rounded-full ${active ? "border-2 border-blue-500" : ""}`}></div>
        <div>{friend.name}</div>
        <span className="text-sm">{friend.timezone}</span>
      </div>
    );
  }
};

export default RsvpFriendCard;