import React, { useState, useEffect, useRef } from "react";
import Togglable from "../common/Togglable";
import GroupCreateFriendForm from "./GroupFriendCreateForm";
import GroupMeetingsCard from "./GroupMeetingsCard";
import GroupFriendCard from "./GroupFriendCard";
import friendService from "../../services/friendService";
import meetingService from "../../services/meetingService";

const Group = ({ user, group, deleteGroup, setMakeInvite }) => {
  const [friends, setFriends] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const toggleRef = useRef();

  useEffect(() => {
    setFriends(group.friends);
    setMeetings(group.meetings);
  }, []);

  const addFriend = async (friendInfo) => {
    toggleRef.current.toggleVisibility();

    // Send new friend
    try {
      const newFriend = await friendService.addFriend(friendInfo, user.token);
      setFriends(friends.concat(newFriend));
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
    <div className="relative py-5 px-10 rounded-[1rem]">
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
          <GroupFriendCard key={friend.id} friend={friend} />
        )}
      </div>

      <div className="py-3">
        <h4 className="pb-5 font-bold text-left">
          Upcoming Hangouts
        </h4>
        {meetings.map(meeting =>
          <GroupMeetingsCard
            user={user}
            key={meeting.id}
            meeting={meeting}
            handleHangoutDelete={handleHangoutDelete}
          />
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