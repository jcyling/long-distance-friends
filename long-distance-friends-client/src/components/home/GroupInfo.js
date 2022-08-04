import React, { useState, useEffect, useRef } from "react";
import Togglable from "../common/Togglable";
import GroupCreateFriendForm from "./GroupFriendCreateForm";
import GroupMeetingsCard from "./GroupMeetingsCard";
import GroupFriendCard from "./GroupFriendCard";
import friendService from "../../services/friendService";
import meetingService from "../../services/meetingService";

const GroupInfo = ({ user, group, deleteGroup, setMakeInvite }) => {
  const [friends, setFriends] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const toggleRef = useRef();

  useEffect(() => {
    setFriends(group.friends);
    setMeetings(group.meetings);
  }, []);

  const addFriend = async (friendInfo) => {
    toggleRef.current.toggleVisibility();

    try {
      const newFriend = await friendService.addFriend(friendInfo, user.token);
      setFriends(friends.concat(newFriend));
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleDeleteFriend = async (friendId) => {
    try {
      await friendService.deleteFriend(friendId);
      setFriends(friends.filter(friend => friend.id !== friendId));
    }
    catch (error) {
      console.log(error);
    }
  };

  const handleHangoutDelete = async (id) => {
    try {
      await meetingService.deleteMeeting(id, user.token);
      setMeetings(meetings.filter(item => item.id !== id));
    }
    catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative py-5 px-5 sm:px-0 rounded-[1rem]">
      <div className="flex flex-row flex-auto">
        <h3 className="pb-5 font-bold text-left">
          {group.name}
        </h3>
        <div className="ml-auto">
          <Togglable buttonLabel="Add Friend" ref={toggleRef}>
            <GroupCreateFriendForm addFriend={addFriend} group={group} />
          </Togglable>
        </div>
      </div>

      <div className="flex flex-wrap mb-6 gap-3">
        {friends.map(friend =>
          <GroupFriendCard
            key={friend.id}
            friend={friend}
            handleDeleteFriend={handleDeleteFriend}
          />
        )}
      </div>

      <div className="py-3">
        <h4 className="pb-5 font-bold text-left">
          Upcoming Hangouts
        </h4>
        <div className="flex gap-2 flex-wrap">

          {meetings.map(meeting =>
            <GroupMeetingsCard
              user={user}
              key={meeting.id}
              meeting={meeting}
              handleHangoutDelete={handleHangoutDelete}
            />
          )}
        </div>
      </div>

      <div className="flex gap-5 justify-start">
        <button className="btn"
          onClick={() => deleteGroup()}>
          Delete Group
        </button>
        <button
          className="btn ml-auto"
          onClick={() => setMakeInvite(true)}>
          Schedule Hangout
        </button>
      </div>
    </div>
  );
};

export default GroupInfo;