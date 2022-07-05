import React from "react";

const RsvpFriendCard = ({ friend }) => {
  
  return (
    <div>
      <div className="bg-gray-300 w-16 h-16 rounded-full"></div>
      <div className="text-center">{friend.name}</div>
    </div>
  );
};

export default RsvpFriendCard;