import React from "react";
import { FiX } from "react-icons/fi";

const GroupFriendCard = ({ friend, handleDeleteFriend }) => {
  return (
    <div className="p-3 border gap-3 relative flex flex-nowrap flex-row w-1/3 text-sm text-left max-w-xs basis-72 shrink-0 rounded-md">
      <div className="bg-gradient-to-r from-blue-200 to-gray-200 w-16 h-16 rounded-full flex flex-col justify-center items-center">
        <div className="font-semibold">
          {friend.name}
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <span className="block">City: {friend.city} </span>
        <span className="block">{friend.timezone}</span>
      </div>
      <FiX
        className="ml-auto cursor-pointer"
        size={24}
        onClick={() => handleDeleteFriend(friend.id)}
      />
    </div>
  );
};

export default GroupFriendCard;