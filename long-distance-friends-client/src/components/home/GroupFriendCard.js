import React from "react";
import { FiX } from "react-icons/fi";

const GroupFriendCard = ({ friend, handleDeleteFriend }) => {
  return (
    <div className="p-3 gap-3 relative flex flex-nowrap flex-row w-1/3 text-sm text-left max-w-xs shrink-0 border rounded-md">
      <div className="bg-gray-300 w-16 h-16 rounded-full">
        {/* Insert default user icon */}
      </div>
      <div className="flex flex-col flex-1">
        <h5 className="font-bold">
          {friend.name}
        </h5>
        <span className="block">{friend.city} </span>
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