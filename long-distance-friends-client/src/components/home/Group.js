import React from "react";
import FriendIcon from "../common/FriendIcon";

const Group = ({ group }) => {
  return (
    <div className="p-5 bg-gray-200 rounded-[1rem]">
      <h3 className="pb-5 font-bold">
        {group.name}
      </h3>
      <div className="flex gap-12">
        {group.friends.map(friend =>
          <FriendIcon key={friend.id} friend={friend} />
        )}
      </div>
      <div className="flex gap-5 justify-end">
        <button className="btn font-normal">New Friend</button>
        <button className="btn bg-purple-300">Make Hangout</button>
      </div>
    </div>
  );
};

export default Group;