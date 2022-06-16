import React from "react";

const FriendIcon = ({ friend }) => {
  return (
    <div className="flex flex-nowrap flex-row gap-5">
      <div className="bg-gray-300 w-20 h-20 rounded-full">
        {/* Insert default icon */}
      </div>
      <div className="flex flex-col">
        <h4 className="font-bold">
          {friend.name}
        </h4>
        <span className="block">Location: {friend.city} </span>
        <span className="block">Timezone: {friend.timezone}</span>
      </div>
    </div>
  );
};

export default FriendIcon;