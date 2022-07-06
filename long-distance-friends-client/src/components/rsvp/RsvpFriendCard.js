import React from "react";

const RsvpFriendCard = ({ friend, handleFriendPick }) => {

  return (
    <div
      className="m-6 flex flex-col items-center cursor-pointer"
      onClick={() => handleFriendPick(friend)}
    >
      <div className="bg-gray-300 w-24 h-24 rounded-full"></div>
      <div>{friend.name}</div>
      <span className="text-sm">{friend.timezone}</span>
    </div>
  );
};

export default RsvpFriendCard;