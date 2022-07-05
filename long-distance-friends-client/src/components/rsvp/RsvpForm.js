import React, { useState, useEffect } from "react";
import meetingService from "../../services/meetingService";
import RsvpAvailabilityPicker from "./RsvpAvailabilityPicker";
import RsvpFriendCard from "./RsvpFriendCard";

const RsvpForm = () => {
  const [meeting, setMeeting] = useState(null);
  const [friend, setFriend] = useState(null);

  // Make a request to retrieve current data of the meeting
  // and its bookings to display
  useEffect(() => {
    const fetchData = async () => {
      await meetingService
        .getMeeting("62c2ed9314a48a3841311fa3")
        .then(res => {
          setMeeting(res);
          console.log(res)
        });
    };
    fetchData();
  }, []);

  if (meeting === undefined) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  else if (meeting) {
    return (
      <main className="px-10 flex flex-col text-left">
        <div className="relative p-6 flex flex-col bg-white border rounded-[1rem]">
          <h3>{meeting.group.name} Friends</h3>
          <h4>Which friend are you?</h4>
          <div className="flex">
            {meeting.group.friends.map(friend => {
              return <RsvpFriendCard key={friend.id} friend={friend} />
            })}
          </div>
          <h4>When are you available?</h4>
          <RsvpAvailabilityPicker range={meeting.window} />

        </div>
      </main>
    );
  }

};

export default RsvpForm;