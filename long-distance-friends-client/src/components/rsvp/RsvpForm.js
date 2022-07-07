import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { convertUtcToDateTimeObj, convertUtcToDateRange } from "../common/TimeUtils";
import AvailabilityDisplay from "../common/AvailabilityDisplay";
import RsvpAvailabilityPicker from "./RsvpAvailabilityPicker";
import RsvpFriendCard from "./RsvpFriendCard";
import meetingService from "../../services/meetingService";

const RsvpForm = () => {
  const [meeting, setMeeting] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [availableDateTime, setAvailableDateTime] = useState([]);
  const [pickerStatus, setPickerStatus] = useState(false);
  const [activeFriend, setActiveFriend] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    meetingService
      .getMeeting(id)
      .then(res => {
        setMeeting(res);

        let convertedBookings = convertBookingsTimezone(res);
        setBookings(convertedBookings);
      });
  }, []);

  const convertBookingsTimezone = (data) => {
    const convertedBookings = data.bookings.map(booking => {
      const utcSlots = booking.availability;
      const userIanaSlots = convertUtcToDateTimeObj(utcSlots);

      return {
        name: booking.booker.name,
        timezone: booking.booker.timezone,
        city: booking.booker.city,
        availability: userIanaSlots
      };
    });
    return convertedBookings;
  };

  const handleFriendPick = (friend) => {
    setActiveFriend(friend);
    setPickerStatus(true);
    setAvailableDateTime([]);
  };

  const handleHangoutSubmit = () => {
    
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
          {
            (pickerStatus && activeFriend) &&
            <div>
              <h4 className="pb-4">Hi {activeFriend.name}, when are you free to hangout?</h4>
              <RsvpAvailabilityPicker
                friendWindow={convertUtcToDateRange(meeting.window, activeFriend.timezone)}
                bookings={bookings}
                setPickerStatus={setPickerStatus}
                setAvailableDateTime={setAvailableDateTime}
              />
            </div>
          }
          {
            (!pickerStatus && activeFriend) &&
            <AvailabilityDisplay
              availableDateTime={availableDateTime}
              setAvailableDateTime={setAvailableDateTime}
              setPickerStatus={setPickerStatus}
            />
          }
        </div>
        <div>
          <button
            className="btn"
            disabled={(availableDateTime.length > 0 && pickerStatus === false) ? false : true}
            onClick={() => handleHangoutSubmit(event)}>
            Make booking
          </button>
        </div>
      </main>
    );
  }

};

export default RsvpForm;