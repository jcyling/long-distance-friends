import React from "react";
import { FiX } from "react-icons/fi";

const FriendIcon = ({ friend }) => {
  return (
    <div className="relative flex flex-nowrap flex-row gap-5 shrink-0 basis-1/6 max-w-xs min-w-min text-sm text-left">
      <div className="bg-gray-300 w-16 h-16 rounded-full">
        {/* Insert default user icon */}
      </div>
      <div className="flex flex-col flex-1">
        <h5 className="font-bold">
          {friend.name}
        </h5>
        <span className="block">{friend.city} </span>
        <span className="block">GMT{friend.timezone}</span>
      </div>
      <FiX className="ml-auto" size={28} />
    </div>
  );
};

export default FriendIcon;