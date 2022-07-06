import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import meetingService from "../../services/meetingService";
import { convertUtcToDateTime } from "../common/TimeUtils";
import RsvpAvailabilityPicker from "./RsvpAvailabilityPicker";
import RsvpFriendCard from "./RsvpFriendCard";

const RsvpForm = () => {
  const [meeting, setMeeting] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeFriend, setActiveFriend] = useState(null);
  const [activeDate, setActiveDate] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await meetingService.getMeeting(id)
      setMeeting(res);
    };
    
    const convertBookingsTimezone = () => {
      const convertedBookings = meeting.bookings.map(booking => {
        const utcSlots = booking.availability;
        const userIanaSlots = utcSlots.map(slot => convertUtcToDateTime(slot));
        
        let converted = {
          ...booking,
          availability: userIanaSlots
        };

        return converted;
      });
      console.log(convertedBookings);
    };

    fetchData();
  }, []);

  const handleFriendPick = (friend) => {
    setActiveFriend(friend);
  };

  const handleDatePick = (date) => {
    setActiveDate(date);

    // Select availability on activeDate and set to bookings
    
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
              <h4 className="pb-4">Hi {activeFriend.name}, when are you free to hangout?</h4>
              <RsvpAvailabilityPicker
                range={meeting.window}
                handleDatePick={handleDatePick}
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