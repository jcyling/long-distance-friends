import React, { useEffect, useState } from "react";

const RsvpFriendCard = ({ friend, handleFriendPick, activeFriend }) => {

  const [active, setActive] = useState(false);

  useEffect(() => {
    if (activeFriend) {
      return (activeFriend.name === friend.name) ? setActive(true) : setActive(false);
    }
  }, [activeFriend]);

  return (
    <div
      className="m-6 flex flex-col items-center cursor-pointer"
      onClick={() => handleFriendPick(friend)}
    >
      <div className={`bg-gray-300 w-24 h-24 rounded-full ${active ? "border-2 border-blue-500" : ""}`}></div>
      <div>{friend.name}</div>
      <span className="text-sm">{friend.timezone}</span>
    </div>
  );
};

export default RsvpFriendCard;