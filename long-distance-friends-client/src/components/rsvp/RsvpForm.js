import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import meetingService from "../../services/meetingService";
import RsvpAvailabilityPicker from "./RsvpAvailabilityPicker";
import RsvpFriendCard from "./RsvpFriendCard";

const RsvpForm = () => {
  const [meeting, setMeeting] = useState(null);
  const [activeFriend, setActiveFriend] = useState(null);
  const [activeDate, setActiveDate] = useState([]);
  const { id } = useParams();

  // Make a request to retrieve current data of the meeting
  // and its bookings to display
  useEffect(() => {
    const fetchData = async () => {
      await meetingService
        .getMeeting(id)
        .then(res => {
          setMeeting(res);
          // Set date array for every date in range
        });
    };
    fetchData();
  }, []);

  const handleFriendPick = (friend) => {
    setActiveFriend(friend);
  };

  const handleDatePick = (date) => {
    console.log(date);
    setActiveDate(date);
  };

  if (meeting === undefined) {
    return (
      <div>
        Loading...
      </div>
    );
  }
  else if (meeting) {
    return (
      <main className="p-10 flex flex-col">
        <div className="relative p-6 flex flex-col bg-white border rounded-[1rem]">
          <h3>{meeting.group.name} Friends</h3>
          <h4>Which friend are you?</h4>
          <div className="flex justify-center">
            {meeting.group.friends.map(friend =>
              <RsvpFriendCard
                key={friend.id}
                friend={friend}
                handleFriendPick={handleFriendPick}
              />
            )}
          </div>
          {activeFriend &&
            <div>
              <h4 className="pb-4">Hi {activeFriend.name}, When are you free to hangout?</h4>
              <RsvpAvailabilityPicker
                range={meeting.window}
                handleDatePick={handleDatePick}
                bookings={meeting.bookings}
                activeDate={activeDate}
                userIana={activeFriend.timezone}
              />
            </div>
          }

        </div>
      </main>
    );
  }

};

export default RsvpForm;