import React, { useState, useEffect, useRef } from "react";
import Togglable from "../common/Togglable";
import FriendForm from "./FriendForm";
import FriendIcon from "../common/FriendIcon";
import groupService from "../../services/groupService";

const Group = ({ user, group, deleteGroup, makeInvite, setMakeInvite }) => {
  const [friends, setFriends] = useState([]);

  const toggleRef = useRef();

  useEffect(() => {
    setFriends(group.friends);
  }, []);

  const addFriend = async (newFriend) => {
    toggleRef.current.toggleVisibility();

    const updatedFriendsList = {
      friends: friends.concat(newFriend)
    };

    // Send new friend
    try {
      const res = await groupService.addFriend(group.id, updatedFriendsList, user.token);
      const newFriend = res.friends[res.friends.length - 1];
      setFriends(friends.concat(newFriend));
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative py-5 px-10 bg-gray-200 rounded-[1rem]">
      <div className="flex flex-row flex-auto">
        <h3 className="pb-5 font-bold text-left">
          {group.name}
        </h3>
        <div className="ml-auto">
          <Togglable buttonLabel="Add Friend" ref={toggleRef}>
            <FriendForm addFriend={addFriend} />
          </Togglable>
        </div>
      </div>

      <div className="flex flex-wrap mb-6 gap-12">
        {friends.map(friend =>
          <FriendIcon key={friend._id} friend={friend} />
        )}
      </div>

      <div className="flex gap-5 justify-start">
        <button className="btn bg-white font-normal"
          onClick={() => deleteGroup()}>
          Delete Group
        </button>
        <button
          className="btn bg-purple-300 ml-auto hover:bg-purple-400"
          onClick={() => setMakeInvite(true)}>
          Schedule Hangout
        </button>
      </div>
    </div>
  );
};

export default Group;