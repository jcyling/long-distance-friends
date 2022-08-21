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
        <div className={"bg-gradient-to-r from-gray-400 to-blue-900 w-24 h-24 rounded-full flex flex-col justify-center"}>
          <div className="text-gray-800 text-lg">{friend.name}</div>
        </div>
        <div className="flex flex-col text-sm">
          <span>{friend.timezone}</span>
          <span>GMT +{friend.offset}</span>
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
        <div className={`flex flex-col justify-center bg-gradient-to-r from-blue-200 to-gray-200 w-24 h-24 rounded-full ${active ? "border-2 border-blue-500" : ""}`}>
          <div className="text-gray-700 text-lg">{friend.name}</div>
        </div>
        <div className="flex flex-col text-sm">
          <span className="text-sm mt-2">{friend.timezone}</span>
          <span>GMT +{friend.offset}</span>
        </div>
      </div>
    );
  }
};

export default RsvpFriendCard;